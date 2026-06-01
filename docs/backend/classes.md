# Turmas — Backend

API para agrupar alunos em turmas (nome, professor, lista de matriculados).

## Objetivo

Representar uma turma escolar e **quem está matriculado**, sem duplicar dados do aluno (nome, email, mensalidade continuam no cadastro de alunos).

## Decisões de desenho

### Ligação unidirecional turma → aluno

A turma guarda um array de IDs de alunos. O documento de **aluno não tem campo de turma**.

**Por quê:** matrícula é “esta turma inclui estes alunos”; um aluno em várias turmas seria possível no futuro sem migrar schema de aluno. O custo: listar turma não traz nomes — o cliente busca alunos separadamente e cruza IDs.

### Sem populate na listagem

`GET /classes` devolve `students` como ObjectIds, não objetos populados. Reduz payload e acoplamento; quem precisa de nome/email já tem ou busca `/students`.

### Matrícula pelo array completo

Incluir ou remover aluno é `PUT` enviando o array **inteiro** de IDs em `students`. Não há rota `/classes/:id/students/:studentId`.

**Por quê:** CRUD simples; o painel da turma no frontend já mantém a lista em memória e envia tudo ao salvar.

### Excluir turma não exclui alunos

Apagar turma remove só o documento da turma. Registros em `Student` permanecem.

### Validação mínima na rota

Diferente de alunos, não há middleware de validação no router — erros de schema ou campos vazios tendem a aparecer como `500` ou falha do Mongoose.

## Contrato da API

| Ação | Método | Rota | Quando usar |
|------|--------|------|-------------|
| Listar | GET | `/classes` | Todas as turmas |
| Criar | POST | `/classes` | Nova turma |
| Atualizar | PUT | `/classes/:id` | Nome, professor e/ou lista de alunos |
| Excluir | DELETE | `/classes/:id` | Remover turma |

### Campos do recurso

| Campo | Tipo | Regra |
|-------|------|--------|
| `name` | string | Obrigatório no schema |
| `teacher` | string | Obrigatório no schema |
| `students` | array de ObjectId | Opcional na criação; default prático é `[]` |

## Comportamento esperado

**Listar** — `200` com array de turmas; cada item inclui `students` como lista de IDs (pode estar vazia).

**Criar** — `201` + mensagem com nome da turma. Frontend costuma criar com `students: []` e matricular depois no painel.

**Atualizar** — Corpo parcial ou completo (`name`, `teacher`, `students`). `200` + `{ classGroup }` atualizado. Matrícula/desmatrícula = substituir o array `students` pela lista desejada.

**Excluir** — Remove a turma; resposta em texto com o nome da turma. Alunos na base **não** são apagados.

## Integração

| Consumidor | Comportamento |
|------------|----------------|
| Frontend — Turmas | Ao abrir a seção, carrega turmas **e** alunos; o painel cruza IDs com a lista de alunos ([../frontend/classes.md](../frontend/classes.md)) |
| Pagamentos | Independente; mensalidade vem do aluno, não da turma |

## Onde olhar no código

`backend/src/` — model de turma (`ClassModel`), controller e router com prefixo `/classes`.
