# Financeiro — Frontend

Seção para gerar mensalidades, listar cobranças e (futuro) histórico de pagamentos.

---

## Objetivo

Dar ao usuário controle visual do ciclo financeiro: disparar geração mensal em lote, ver status por aluno e, depois, registrar pagamentos avulsos ou consultar histórico.

---

## Estado atual

A tela existe com layout (abas Mensalidades / Histórico, tabela, botão “Gerar Mensalidade”), mas **ainda não** integra com a API pelo `App` — tabelas vazias e sem handlers no botão.

O backend de geração e criação avulsa já está documentado em [../backend/payments.md](../backend/payments.md).

---

## Decisões de desenho (planejado)

### Mesmo padrão do restante do app

Funções de fetch e estado de pagamentos devem ficar no `App` (ou hook compartilhado), com `Finance` focado em UI — alinhado a [app.md](./app.md).

---

### Mês de referência agregado na UI

O usuário escolhe mês, ano e dia de vencimento na interface; o cliente monta `referenceMonth` como `"YYYY-MM"` antes do POST `/payments/generate`.

**Por quê:** formato exigido pela API; evita erro de digitação com selects.

---

### Listagem depende de GET futuro

Hoje o backend não expõe listagem de pagamentos. A tabela de mensalidades precisará de `GET /payments` (ou filtro por mês) antes de exibir dados reais — até lá, a doc de backend deve ganhar a seção de listagem quando implementada.

---

## Comportamento esperado (quando completo)

### Gerar mensalidades

1. Usuário abre fluxo (modal ou formulário) e informa mês/ano e dia de vencimento.
2. Cliente chama `POST /payments/generate` com `referenceMonth` e `dueDay`.
3. Toast com mensagem e quantidade criada (`createdCount`).
4. Lista recarregada — cobranças novas aparecem; alunos que já tinham aquele mês não geram duplicata (backend pula).

---

### Mensalidades na tabela

Colunas previstas:

- aluno (nome via cruzamento com lista de alunos)
- mês/ano
- valor
- status
- vencimento
- ações (marcar pago — quando houver PUT)

---

### Aba histórico

Visão de movimentações passadas.

Escopo ainda em definição — pode ser:

- filtro na mesma coleção `Payment`
- ou separação de entidade no futuro

---

## API usada

| Ação | HTTP | Status |
|------|------|--------|
| Gerar lote | POST `/payments/generate` | Backend pronto |
| Criar avulso | POST `/payments/` | Backend pronto |
| Listar | GET `/payments` | **A implementar** |

Detalhes de regras: [../backend/payments.md](../backend/payments.md).

---

## Integração

- Depende de cadastro de alunos com `monthlyFee` e status coerente para geração em lote.
- Nomes na tabela seguem a mesma estratégia das turmas: IDs no pagamento + cruzamento com lista de alunos no cliente.

---

## Onde olhar no código

- Shell da tela: `frontend/src/components/Finance/`
- Integração futura: `frontend/src/App.jsx` (funções de fetch a criar)
- Regras de negócio: `backend/src/` módulo payments
