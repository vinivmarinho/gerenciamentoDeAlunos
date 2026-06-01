# Turmas — Frontend

Tela de listagem e gerenciamento de turmas, com criação via modal e painel para editar turma, matricular/desmatricular alunos e excluir turma.

---

## Objetivo

Gerenciar turmas e matrículas de forma visual.

Como a API retorna apenas IDs de alunos dentro da turma, o frontend precisa cruzar essas informações para exibir nomes e permitir a matrícula.

---

## Decisões de desenho

### Duas fontes de dados na seção de turmas

Ao entrar em **Turmas**, a aplicação carrega:

- lista de turmas
- lista de alunos

O painel usa essas duas fontes para cruzar os dados:

- `classGroup.students` (IDs)
- lista completa de alunos

Assim é possível:
- mostrar nomes dos alunos
- permitir matrícula
- calcular total da turma

**Por quê:** a API não usa `populate`, então o frontend precisa fazer esse cruzamento manual ([../backend/classes.md](../backend/classes.md)).

---

### Matrícula só é enviada ao salvar

No painel da turma, adicionar ou remover alunos altera apenas um estado local (`enrolledIds`).

A alteração só é enviada para o backend quando o usuário salva.

**Por quê:** a API trabalha com o array completo de alunos, então não faz sentido enviar uma requisição a cada clique.

---

### Turma começa sem alunos

Ao criar uma turma, ela sempre é enviada com:

```js id="qk9l2a"
students: []
