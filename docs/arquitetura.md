# Arquitetura geral

Visão full stack do **Gerenciamento de Alunos**: um painel administrativo escolar com API REST e MongoDB.

---

## Objetivo do sistema

Centralizar o cadastro de alunos, organização em turmas e financeiro.

O sistema também fornece um dashboard para visualização rápida dos dados principais.

---

## Stack

| Camada | Tecnologias |
|--------|-------------|
| Frontend | React, Vite, Chart.js, React Toastify |
| Backend | Node.js, Express, Mongoose |
| Banco | MongoDB |
| Deploy | Vercel (frontend) · Render (backend) |

---

## Fluxo de dados

```txt
Interface (React)
   ↓ HTTP (fetch)
API REST (Express)
   ↓ ODM (Mongoose)
MongoDB
