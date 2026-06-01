# Alunos — Frontend

Tela de listagem, busca, filtros e modais de criação, edição e exclusão de alunos.

---

## Objetivo

Permitir que o usuário administre o cadastro de alunos de forma simples e responsiva.

A lista de alunos também alimenta outras partes do sistema, como dashboard, turmas e financeiro.

---

## Decisões de desenho

### Sem fetch direto na tela

A tela de alunos não faz requisições diretamente.

O `App` centraliza:

- lista de alunos
- loading
- funções de create / update / delete
- recarregamento da lista

As telas apenas consomem esses dados via props.

**Por quê:** garante uma única fonte de verdade. Assim, qualquer alteração reflete automaticamente no dashboard e em outras seções.

---

### Um único formulário para criar e editar

O mesmo componente de formulário é usado tanto para criação quanto para edição.

O comportamento muda conforme existe ou não um aluno selecionado.

---

### Exclusão com confirmação

A exclusão exige confirmação em modal.

Isso evita remoções acidentais, já que a operação é permanente no backend.

---

## Comportamento esperado

### Ao abrir Dashboard ou Alunos

O sistema garante que a lista de alunos esteja carregada.

Durante o carregamento, a interface pode exibir um estado de loading.

---

### Listagem

- Exibe tabela com todos os alunos
- Permite busca por nome
- Permite filtro por status

Filtros são aplicados no cliente, sem novas requisições.

---

### Criar aluno

1. Usuário abre o modal “Novo Aluno”
2. Preenche os campos obrigatórios
3. Envia o formulário

Fluxo:
- `POST /students`
- em sucesso: fecha modal
- atualiza lista
- exibe toast de sucesso

Erros de validação vêm do backend e são exibidos na UI.

---

### Editar aluno

1. Usuário seleciona “editar”
2. Formulário abre preenchido
3. Envia alteração

Fluxo:
- `PUT /students/:id`
- atualiza lista
- fecha modal em sucesso

---

### Excluir aluno

1. Usuário solicita exclusão
2. Confirma no modal
3. Sistema executa exclusão

Fluxo:
- `DELETE /students/:id`
- recarrega lista em sucesso

**Observação:** alunos removidos ainda podem aparecer referenciados em turmas até atualização manual dessas turmas.

---

## API usada

Contrato completo: [../backend/students.md](../backend/students.md)

| Ação | Método | Endpoint |
|------|--------|----------|
| Listar alunos | GET | `/students` |
| Criar aluno | POST | `/students` |
| Atualizar aluno | PUT | `/students/:id` |
| Excluir aluno | DELETE | `/students/:id` |

---

## Onde olhar no código

- Orquestração e estado global: `frontend/src/App.jsx`
- Listagem e modais: `frontend/src/components/Students/`
- Formulário reutilizável: `frontend/src/components/Form/`
- Métricas do dashboard: `frontend/src/utils/students.js`
