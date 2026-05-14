# 📚 Gerenciamento de Alunos

---

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---


Sistema full stack para gerenciamento de alunos, turmas, presença e controle financeiro, desenvolvido com React no frontend e Node.js/Express no backend.

O projeto simula um sistema administrativo escolar com dashboard interativo, API REST e integração com banco de dados MongoDB, com foco em prática de arquitetura full stack e organização de aplicações reais.

⚠️ Projeto ainda em desenvolvimento, podendo sofrer alterações e melhorias constantes.

---

## 🎯 Objetivo do projeto

O objetivo deste sistema é praticar o desenvolvimento de uma aplicação full stack completa, simulando um ambiente real de gestão escolar.

O sistema permite centralizar informações de alunos, facilitando o controle de cadastro, organização por turmas e visualização de dados administrativos através de um dashboard.

---

## ⚙️ Funcionalidades

- Dashboard com cards de resumo e gráficos (Chart.js)
- Cadastro de alunos (nome, email, turma e mensalidade)
- Listagem de alunos com dados vindos do MongoDB
- API REST completa (CRUD de alunos)
- Estrutura inicial para turmas, presença e financeiro
- Interface responsiva com sidebar e navegação mobile
- Feedback visual com React Toastify

---

## 🧠 Conceitos aplicados

- Arquitetura full stack (Frontend + Backend)
- API REST com Express
- CRUD completo com MongoDB e Mongoose
- Componentização em React
- Consumo de API com Fetch
- Organização por pastas (MVC simplificado)
- Gerenciamento de estado com React Hooks

---

## 🧰 Tecnologias utilizadas

### Frontend
- React
- Vite
- Chart.js
- React Toastify
- Font Awesome
- CSS modular
- Vercel (Deploy)

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- CORS
- Dotenv

---

## 🚀 Deploy

- Frontend: Vercel  
🔗 [Acessar aplicação](https://gerenciamento-de-alunos-vinicius.vercel.app/)

> Projeto em desenvolvimento contínuo, podendo receber atualizações frequentes.

---

## 🏗️ Arquitetura do sistema

```txt
Frontend (React)
   ↓ Fetch API
Backend (Node.js + Express)
   ↓ Mongoose
MongoDB (Banco de dados)