# Pagamentos — Backend

Cobranças mensais por aluno: geração em lote no início do período e criação avulsa quando necessário.

## Objetivo

Registrar **uma cobrança por aluno por mês de referência**, com valor, vencimento e status (`Pendente`, `Pago`, `Atrasado`), sem duplicar o mesmo aluno no mesmo mês.

## Decisões de desenho

### Um pagamento por (aluno + mês)

Índice único composto `(student, referenceMonth)` no banco. Tentativa de segunda cobrança para o mesmo par falha na persistência.

**Por quê:** o mês de referência (`"2026-05"`) é a chave de negócio; evita cobrança duplicada por bug ou clique repetido.

### `referenceMonth` em formato fixo

String `YYYY-MM` (ex.: `2026-05`). Mês deve ser 01–12. Facilita ordenação, exibição e validação sem ambiguidade de timezone na string.

### Geração em lote só para alunos “ativos”

Busca alunos cujo `status` corresponde a “ativo” sem diferenciar maiúsculas/minúsculas. Inativos não entram no lote.

**Por quê:** mensalidade automática não deve cobrar quem saiu do quadro, desde que o status esteja correto no cadastro.

### Idempotência parcial no lote

Para cada aluno ativo: se já existir pagamento naquele `referenceMonth`, **pula** (não falha a operação inteira). `createdCount` informa quantos registros novos foram criados.

### Valor e vencimento na geração

- **Valor:** copiado de `monthlyFee` do aluno no momento da geração.
- **Vencimento:** calculado a partir de `referenceMonth` + `dueDay` (padrão 10), limitado ao último dia válido do mês (ex.: vencimento dia 31 em fevereiro vira o último dia de fevereiro).

### Criação avulsa sempre começa Pendente

Mesmo que o cliente envie outro status no corpo, a API rejeita ou força `Pendente` na criação. Alteração para Pago/Atrasado é evolução futura (update ainda não exposto nas rotas atuais).

## Contrato da API

| Ação | Método | Rota | Quando usar |
|------|--------|------|-------------|
| Gerar mensalidades | POST | `/payments/generate` | Início do mês — todos os ativos |
| Criar pagamento | POST | `/payments/` | Um aluno, valor/data definidos manualmente |

Não há `GET /payments` implementado no backend no momento — listagem na UI ainda depende de endpoint futuro.

### POST `/payments/generate`

| Campo | Obrigatório | Regra |
|-------|-------------|--------|
| `referenceMonth` | sim | `YYYY-MM` válido |
| `dueDay` | não | 1–31; default 10 |

**Sucesso** — `200` + `{ message, createdCount }`. Mensagens possíveis: N alunos gerados; nenhum ativo; nenhum novo (todos já tinham cobrança naquele mês).

**Erro de entrada** — `400` se mês inválido ou `dueDay` fora do intervalo.

### POST `/payments/`

| Campo | Obrigatório | Regra |
|-------|-------------|--------|
| `student` | sim | ObjectId do aluno |
| `referenceMonth` | sim | `YYYY-MM` |
| `amount` | sim | número |
| `dueDate` | sim | data |
| `status` | não | na criação só `Pendente` é aceito |

**Sucesso** — `201` + mensagem e objeto `payment`.

**Duplicata** — Mesmo aluno + mesmo mês → erro do índice único (tipicamente `500` com mensagem do Mongo na resposta atual).

## Comportamento esperado

### Geração em lote

1. Valida mês e dia de vencimento.
2. Lista alunos ativos.
3. Para cada um: se não existir cobrança no mês, cria com `amount = monthlyFee`, `status = Pendente`, `dueDate` calculado.
4. Retorna quantos registros **novos** foram criados (pode ser 0).

### Criação individual

Uma cobrança manual (ajuste, entrada fora do lote). Mesmas regras de mês e unicidade. Status na criação deve ser pendente ou omitido.

## Integração

| Módulo | Relação |
|--------|---------|
| Alunos | Fonte de `monthlyFee` e filtro de status na geração ([students](./students.md)) |
| Frontend | Tela financeiro em construção; ver [../frontend/financeiro.md](../frontend/financeiro.md) |

## Onde olhar no código

`backend/src/` — model `payment` (enum de status + índice único), controller e router sob `/payments`.
