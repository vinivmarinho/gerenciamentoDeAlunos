# Financeiro — Frontend

Seção responsável por gerar mensalidades, listar cobranças e (no futuro) exibir histórico de pagamentos.

---

## Objetivo

Dar ao usuário uma visão do ciclo financeiro:

- gerar mensalidades em lote
- acompanhar cobranças por aluno
- futuramente registrar pagamentos e ver histórico

---

## Estado atual

A tela já existe com estrutura visual:

- abas (Mensalidades / Histórico)
- tabela
- botão “Gerar Mensalidade”

Mas ainda não está conectada ao backend pelo `App`.

Ou seja:
- não há fetch de pagamentos
- botões ainda não executam ações reais
- tabelas estão vazias ou mockadas

O backend de pagamentos já está definido em [../backend/payments.md](../backend/payments.md).

---

## Decisões de desenho (planejado)

### Mesmo padrão do restante do app

O módulo financeiro seguirá a mesma arquitetura:

- estado e chamadas de API no `App` (ou hook compartilhado)
- componente Finance apenas para UI

Isso mantém consistência com alunos e turmas ([app.md](./app.md)).

---

### Mês de referência montado no frontend

O usuário escolhe mês, ano e dia de vencimento na interface.

O frontend monta o valor final antes da requisição:

```text id="m9k2la"
YYYY-MM
