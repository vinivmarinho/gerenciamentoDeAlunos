# Alunos — Backend

API de cadastro e manutenção de alunos. Base do sistema para dashboard, turmas e geração de mensalidades.

---

## Objetivo

Manter o registro principal de cada aluno: identificação, turno, status e **mensalidade (`monthlyFee`)**.

Esse valor é usado depois pelo módulo de pagamentos para gerar as cobranças mensais.

---

## Decisões de desenho

### Mensalidade fica no aluno

O valor da mensalidade pertence ao cadastro do aluno, não ao pagamento.

Na geração de cobranças, o sistema copia esse valor para cada pagamento.

Isso significa que:

- Alterar a mensalidade do aluno não altera cobranças antigas.
- Cada cobrança mantém o valor do momento da geração.

---

### Validação mais forte na criação

A validação mais rígida acontece no `POST`.

No `PUT`, o sistema aceita o corpo completo e depende do schema do Mongo para validar os dados.

Ou seja, quem atualiza precisa manter consistência dos campos.

---

### Status como string simples

O campo `status` é armazenado como string (ex.: `"Ativo"` ou `"ativo"`).

Na geração de pagamentos, o sistema trata esse valor de forma case-insensitive.

Por isso, é importante manter um padrão no frontend para evitar inconsistências.

---

## Contrato da API

| Ação | Método | Rota | Quando usar |
|------|--------|------|-------------|
| Health | GET | `/students/health` | Verificar se o serviço está ativo |
| Listar | GET | `/students` | Buscar todos os alunos |
| Criar | POST | `/students` | Cadastrar novo aluno |
| Atualizar | PUT | `/students/:id` | Alterar dados do aluno |
| Excluir | DELETE | `/students/:id` | Remover aluno |

---

## Corpo na criação (POST)

| Campo | Tipo | Regra |
|-------|------|--------|
| name | string | Obrigatório |
| email | string | Obrigatório |
| monthlyFee | number | Obrigatório, ≥ 0 |
| studentShift | string | Obrigatório |
| status | string | Obrigatório |

---

## Comportamento esperado

### Listar

Retorna `200` com todos os alunos cadastrados.

Inclui o `_id` e demais campos do schema.

---

### Criar

Valida os campos e cria o aluno.

- Sucesso: `201` + mensagem com o nome do aluno
- Erro de validação: `400` com explicação

---

### Atualizar

Atualiza o aluno pelo ID.

- Sucesso: `200` + aluno atualizado
- ID inválido ou erro interno: `500`

---

### Excluir

Remove o aluno do sistema.

- Retorna mensagem com o nome do aluno removido
- Não remove automaticamente referências em turmas ou pagamentos

---

### Health

Endpoint simples para verificar se o serviço está funcionando.

- `200` + mensagem de OK

---

## Integração

| Módulo | Relação |
|--------|--------|
| Turmas | Turma guarda apenas IDs de alunos ([classes](./classes.md)) |
| Pagamentos | Usa alunos ativos e copia `monthlyFee` na geração ([payments](./payments.md)) |
| Frontend | Lista de alunos alimenta dashboard e telas principais |

---

## Onde olhar no código

`backend/src/`

- Model: `student`
- Controller: regras de CRUD
- Routes: `/students`
- Middlewares: validação de entrada