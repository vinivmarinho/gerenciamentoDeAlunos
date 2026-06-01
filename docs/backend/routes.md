# API — Organização das rotas

Visão geral de como qualquer requisição percorre o backend.

---

## Objetivo

Organizar a API no padrão REST usando os recursos:

- `/students`
- `/classes`
- `/payments`

A ideia é manter uma estrutura consistente para facilitar manutenção e criação de novos módulos.

---

## Fluxo de uma requisição

```txt
Processo Node (env + conexão com o banco)
   ↓
Aplicação Express (middlewares globais + prefixos)
   ↓
Router do recurso (define método + path)
   ↓
[Opcional] middleware de validação
   ↓
Controller (regra de negócio)
   ↓
Model (Mongoose)
   ↓
MongoDB
   ↓
Resposta JSON