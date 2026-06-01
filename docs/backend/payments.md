# Pagamentos — Backend

Cobranças mensais por aluno, com geração automática em lote e criação manual quando necessário.

---

## Objetivo

O sistema registra **uma cobrança por aluno em cada mês de referência**, com valor, vencimento e status (`Pendente`, `Pago`, `Atrasado`).

A regra principal é simples: não pode existir duas cobranças para o mesmo aluno no mesmo mês.

---

## Decisões de desenho

### Um pagamento por aluno por mês

O sistema não permite duplicar cobranças para o mesmo aluno e mês.

Isso é garantido por um índice único no banco:

(student + referenceMonth)

Por quê: evita cobrança duplicada por erro do sistema ou requisição repetida.

---

### Mês de referência

O mês é salvo no formato:

`YYYY-MM` (ex.: `2026-05`)

Esse formato facilita validação, ordenação e evita problemas com datas completas e fuso horário.

---

### Geração em lote apenas para alunos ativos

A geração automática considera apenas alunos com status ativo.

Alunos inativos não entram no processo.

Por quê: evita cobrar quem já saiu da escola, desde que o cadastro esteja atualizado.

---

### O lote ignora cobranças que já existem

Ao gerar as mensalidades:

- Se o aluno não tiver cobrança no mês, cria.
- Se já existir, apenas ignora.

O processo continua normalmente para os outros alunos.

O campo `createdCount` mostra quantas cobranças novas foram criadas.

---

### Valor e vencimento na geração

- **Valor:** vem da `monthlyFee` do aluno no momento da geração.
- **Vencimento:** calculado com base no `referenceMonth` + `dueDay` (padrão 10).

Se o dia ultrapassar o limite do mês (ex.: fevereiro), o sistema ajusta para o último dia válido.

---

### Criação manual sempre começa como Pendente

Mesmo que outro status seja enviado, a cobrança sempre é criada como `Pendente`.

Alterações para `Pago` ou `Atrasado` serão feitas em etapas futuras.

---

## Contrato da API

| Ação | Método | Rota | Quando usar |
|------|--------|------|-------------|
| Gerar mensalidades | POST | `/payments/generate` | Início do mês, para todos os alunos ativos |
| Criar pagamento | POST | `/payments/` | Quando precisar criar uma cobrança manual |

---

## POST `/payments/generate`

### Campos

| Campo | Obrigatório | Regra |
|-------|-------------|------|
| referenceMonth | sim | formato YYYY-MM |
| dueDay | não | 1 a 31 (padrão: 10) |

### Respostas

- **200** → geração concluída com sucesso
  - retorna mensagem e `createdCount`
- **400** → dados inválidos

---

## POST `/payments/`

### Campos

| Campo | Obrigatório | Regra |
|-------|-------------|------|
| student | sim | ID do aluno |
| referenceMonth | sim | YYYY-MM |
| amount | sim | número |
| dueDate | sim | data |
| status | não | sempre será `Pendente` na criação |

### Respostas

- **201** → cobrança criada
- **Erro de duplicidade** → aluno já possui cobrança no mês

---

## Comportamento esperado

### Geração em lote

1. Valida mês e dia de vencimento.
2. Busca alunos ativos.
3. Para cada aluno:
   - cria cobrança se não existir
   - ignora se já existir
4. Retorna quantos registros novos foram criados.

---

### Criação manual

Cria uma cobrança específica para um aluno.

As mesmas regras de mês e duplicidade continuam valendo.

---

## Integração

| Módulo | Relação |
|--------|---------|
| Alunos | Fonte de valor (`monthlyFee`) e status |
| Frontend | Consome os dados de pagamentos e monta a tela financeira |

---

## Onde olhar no código

Tudo está dentro de:

`backend/src/`

- Model: payment (índice único + status)
- Controller: regras de criação e geração
- Routes: endpoints `/payments`
