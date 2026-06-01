# Turmas — Frontend

Listagem de turmas, criação via modal e painel para editar turma, matricular/desmatricular alunos e excluir turma.

## Objetivo

Gerenciar turmas e matrículas de forma visual, lidando com a limitação da API que retorna apenas IDs de alunos dentro das turmas.

## Decisões de desenho

### Duas fontes de dados na seção Turmas

Ao entrar em `turmas`, o app carrega **turmas** e **alunos**. O painel cruza `classGroup.students` (IDs) com a lista completa de alunos para mostrar nomes, buscar quem matricular e somar mensalidades.

**Por quê:** alinhado à API sem populate ([../backend/classes.md](../backend/classes.md)).

### Matrícula local até salvar

No painel, adicionar/remover aluno altera um estado local (`enrolledIds`). Só ao salvar é enviado o array completo no PUT.

**Por quê:** mesmo contrato do backend (array inteiro); evita uma requisição por clique.

### Turma nova sem alunos

Criação envia nome e professor com `students: []`. Matrícula ocorre no painel “Gerenciar”.

### Soma de mensalidade no painel

Total exibido é calculado no cliente somando `monthlyFee` dos alunos matriculados na turma (utilitário compartilhado com métricas de alunos).

## Comportamento esperado

### Listagem

- Grid de cards: nome, professor, contagem de alunos (tamanho do array de IDs).
- Botão “Gerenciar” abre o painel da turma.
- “Nova Turma” abre modal de criação.

### Criar turma

Modal com nome e professor → POST → lista de turmas recarregada → modal fecha em sucesso.

### Painel (gerenciar)

- Editar nome e professor.
- Lista de matriculados com opção de remover da turma (ainda só no estado local até salvar).
- Campo de busca para adicionar aluno: sugestões apenas entre alunos **não** matriculados nesta turma.
- Salvar → PUT com `name`, `teacher`, `students` (array de IDs) → fecha painel em sucesso.
- Excluir turma → confirmação → DELETE → recarrega turmas; alunos permanecem no sistema.

### Loading

Enquanto turmas carregam, mensagem de aguardo; lista vazia mostra texto de nenhuma turma cadastrada.

## API usada

Contrato: [../backend/classes.md](../backend/classes.md).

| Ação do usuário | HTTP |
|-----------------|------|
| Abrir seção | GET `/classes` + GET `/students` |
| Nova turma | POST `/classes` |
| Salvar painel | PUT `/classes/:id` |
| Excluir turma | DELETE `/classes/:id` |

## Onde olhar no código

- Fetch e callbacks: `frontend/src/App.jsx`
- Listagem e modais: `frontend/src/components/Classes/`
- Formulário de nova turma: `frontend/src/components/ClassForm/`
- Painel de matrícula: `frontend/src/components/ClassPanel/`
