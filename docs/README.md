# Documentação do projeto

Referência de **comportamento e decisões** do sistema Gerenciamento de Alunos.

O foco não é descrever o código linha por linha, mas explicar **o que o sistema faz e por quê**.

Isso ajuda a documentação a continuar útil mesmo quando o código muda e evitar constantes atualizações na documentação.

---

## Por onde começar

1. [Arquitetura geral](./arquitetura.md) — visão full stack e módulos
2. Backend
   - [Organização das rotas](./backend/routes.md)
   - [Alunos](./backend/students.md)
   - [Turmas](./backend/classes.md)
   - [Pagamentos](./backend/payments.md)
3. Frontend
   - [App e navegação](./frontend/app.md)
   - [Alunos](./frontend/students.md)
   - [Turmas](./frontend/classes.md)
   - [Financeiro](./frontend/financeiro.md)

---

## Estrutura de pastas

```txt
docs/
├── README.md           ← mapa do sistema de documentação
├── arquitetura.md
├── backend/
│   ├── rotas.md
│   ├── students.md
│   ├── classes.md
│   └── payments.md
└── frontend/
    ├── app.md
    ├── students.md
    ├── classes.md
    └── financeiro.md
