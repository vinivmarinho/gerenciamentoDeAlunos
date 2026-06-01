# App — Frontend

Comportamento geral da aplicação React: navegação, estado compartilhado e comunicação com a API.

---

## Objetivo

A aplicação é uma SPA (single page application) com seções como:

- Dashboard
- Alunos
- Turmas
- Financeiro

A ideia é reutilizar dados sempre que possível e evitar requisições duplicadas ou estados diferentes para a mesma informação.

---

## Decisões de desenho

### Estado e chamadas de API no App

As principais listas (`students`, `classes`), estados de loading e funções de requisição ficam centralizadas no `App`.

As telas filhas não fazem chamadas diretas na API — elas recebem dados e funções por props.

**Por quê:** evita duplicação de fetch e mantém tudo sincronizado após criar, editar ou excluir registros.

---

### Carregamento por seção

A aplicação não busca tudo ao abrir.

Um controle observa a seção ativa e busca apenas os dados necessários.

Isso reduz chamadas desnecessárias e mantém os dados atualizados quando o usuário entra em cada área.

---

### Métricas do dashboard sem backend extra

Os dados do dashboard são calculados a partir da lista de alunos já carregada.

As funções ficam em `utils/`, sem necessidade de endpoints de analytics.

**Por quê:** simplifica o backend enquanto o projeto ainda é pequeno.

O custo é que os dados refletem apenas o que já está em memória no frontend.

---

## Comportamento esperado

### Navegação

A navegação é feita por estado (`activeSection`), sem uso de rotas no início do projeto.

| Seção | O que o usuário vê | Dados carregados |
|------|--------------------|------------------|
| dashboard | Cards e gráficos | alunos |
| alunos | CRUD de alunos | alunos |
| turmas | lista e matrícula | alunos + turmas |
| financeiro | evolução do módulo | parcial |

---

### Após ações (CRUD)

Fluxo padrão após qualquer alteração:

1. Usuário executa ação (criar, editar ou excluir)
2. App envia requisição para API
3. Em caso de sucesso:
   - atualiza lista correspondente
   - exibe toast de sucesso
4. Em caso de erro:
   - mantém estado atual
   - exibe mensagem de erro

---

### URL da API

A URL base da API fica centralizada no `App`.

Os componentes filhos não precisam conhecer ou repetir essa configuração.

---

## Integração

| Documento | Descrição |
|------------|----------|
| students.md | Tela e fluxo de alunos |
| classes.md | Turmas e matrícula |
| finance.md | Módulo financeiro (em evolução) |
| backend/rotas.md | Contratos da API |

---

## Onde olhar no código

- Entrada da aplicação: `frontend/src/main.jsx`
- Estado global e controle de seções: `frontend/src/App.jsx`
- Navegação: `components/SideBar/`, `components/MobileNav/`
- Funções utilitárias: `frontend/src/utils/`
