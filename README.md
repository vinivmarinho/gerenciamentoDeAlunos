# 📚 Gerenciamento de Alunos

---

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## 🚀 Deploy

- Frontend: Vercel  
🔗 [Acessar aplicação](https://gestao-alunos.viniciusmarinho.dev.br/)

> Projeto em desenvolvimento contínuo, podendo receber atualizações frequentes.

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

### Arquitetura e organização
- **Full stack**: React (Vite) no frontend, Express + MongoDB no backend
- **API REST** com rotas, controllers e model (MVC simplificado)
- **CRUD** completo com MongoDB e Mongoose
- **Separação por pastas**: `components/`, `utils/`, `controllers/`, `routes/`, `models/`
- **Deploy desacoplado**: frontend na Vercel, backend no Render

### React — estado e fluxo de dados
- **Lifting state up**: estado de alunos (`students`, `loading`) e operações da API (`createStudent`, `deleteStudent`, `showStudents`) centralizados em `App.jsx`, repassados via props para `Students`, `Form` e `Dashboard`
- **Single source of truth**: uma única lista de alunos alimenta listagem, dashboard e métricas
- **Props**: componentes filhos recebem dados e funções do pai (ex.: `Form` envia o formulário; quem comunica com a API é o `App`)
- **Hooks**: `useState`, `useEffect`, `useCallback`, `useRef`

### React — UI e comportamento
- **Componentização**: cada área da aplicação em seu componente (`SideBar`, `Students`, `Dashboard`, etc.)
- **Renderização condicional**: loading, modais de cadastro/exclusão, troca de seção com `switch`
- **Controlled components**: formulário e filtros de busca controlados pelo estado do React
- **Dados derivados**: totais e percentuais calculados a partir de `students` (funções em `utils/students.js`)
- **Filtragem no cliente**: busca por nome e filtro por status com `filter`
- **Padrão modal**: backdrop, fechar ao clicar fora (`useRef` + listener) e `stopPropagation` no conteúdo
- **Feedback ao usuário**: React Toastify em sucesso/erro das operações

### JavaScript e integração
- **Fetch API** com `async/await`, `try/catch/finally` e tratamento de `response.ok`
- **Funções puras** em `utils/` (`reduce`, `filter`) separadas da lógica de interface
- **Optional chaining** e **nullish coalescing** (`student._id ?? student.id`)

### Backend
- **Express middleware**: `express.json()`, CORS
- **Controllers assíncronos** para operações de alunos
- **Variáveis de ambiente** com `dotenv` (porta, conexão com o banco)

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



## 🏗️ Arquitetura do sistema

```txt
Frontend (React)
   ↓ Fetch API
Backend (Node.js + Express)
   ↓ Mongoose
MongoDB (Banco de dados)
