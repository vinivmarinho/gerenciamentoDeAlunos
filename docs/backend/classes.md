# Turmas — Backend

API para agrupar alunos em turmas (nome, professor e lista de matriculados).

---

## Objetivo

Representar uma turma escolar e **quem está matriculado**, sem duplicar dados do aluno.

Informações como nome, email e mensalidade continuam no cadastro de alunos.

---

## Decisões de desenho

### Turma aponta para alunos (não o contrário)

A turma guarda um array de IDs de alunos. O aluno não tem campo de turma.

**Por quê:** matrícula funciona como “esta turma contém estes alunos”.

Isso permite que, no futuro, um aluno participe de várias turmas sem precisar mudar o schema do aluno.

O custo disso é que a turma não traz os dados completos dos alunos — o frontend precisa buscar em `/students` e cruzar os IDs.

---

### Sem populate na listagem

`GET /classes` retorna apenas os IDs dos alunos em `students`, sem expandir os dados.

Isso reduz o tamanho da resposta e mantém a API mais simples.

Quem precisa de nome ou email deve buscar os alunos separadamente.

---

### Matrícula é feita substituindo o array inteiro

Para adicionar ou remover alunos, o sistema usa `PUT /classes/:id` enviando o array completo de `students`.

Não existe rota específica para adicionar/remover um aluno individualmente.

**Por quê:** o frontend já mantém a lista completa em memória e envia o estado final da turma.

---

### Exclusão de turma não afeta alunos

Ao excluir uma turma, apenas o documento da turma é removido.

Os alunos continuam existindo normalmente no sistema.

---

### Validação mínima na rota

Diferente do módulo de alunos, não há middleware de validação nas rotas.

Isso significa que erros de entrada podem aparecer como falhas do Mongoose ou respostas `500`, caso não sejam tratados no controller.

---

## Contrato da API

| Ação | Método | Rota | Quando usar |
|------|--------|------|-------------|
| Listar | GET | `/classes` | Buscar todas as turmas |
| Criar | POST | `/classes` | Criar nova turma |
| Atualizar | PUT | `/classes/:id` | Alterar turma ou alunos |
| Excluir | DELETE | `/classes/:id` | Remover turma |

---

## Campos do recurso

| Campo | Tipo | Regra |
|-------|------|--------|
| name | string | Obrigatório no schema |
| teacher | string | Obrigatório no schema |
| students | array de ObjectId | Opcional na criação (default: `[]`) |

---

## Comportamento esperado

### Listar

Retorna `200` com todas as turmas.

Cada turma inclui `students` como lista de IDs (pode estar vazia).

---

### Criar

Retorna `201` com mensagem de sucesso.

O frontend geralmente cria a turma com `students: []` e adiciona alunos depois.

---

### Atualizar

Pode atualizar `name`, `teacher` ou `students`.

Retorna `200` com a turma atualizada.

Para matrícula/desmatrícula, o array `students` é substituído por completo.

---

### Excluir

Remove a turma do sistema.

Retorna uma mensagem simples com o nome da turma removida.

Os alunos não são afetados.

---

## Integração

| Módulo | Relação |
|--------|--------|
| Frontend (Turmas) | Carrega turmas e alunos separadamente e cruza os dados |
| Pagamentos | Não depende de turmas; usa apenas dados do aluno |

---

## Onde olhar no código

`backend/src/`

- Model: `ClassModel`
- Controller: regras de turma
- Routes: `/classes`
