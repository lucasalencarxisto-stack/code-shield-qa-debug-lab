# 🛡️ Code Shield — QA & Debug Lab / ShieldMart

Laboratório autoral **simulado** de qualidade de software, testes automatizados e debugging. O ShieldMart é um pequeno checkout de e-commerce com **três defeitos intencionalmente introduzidos** para praticar reprodução, relatório de bug, análise de causa raiz, correção e teste de regressão.

> ⚠️ Não é auditoria de um cliente real. Não há pagamentos, API externa ou coleta de dados reais. Os relatórios documentam uma simulação controlada.

## Stack
React + TypeScript + Vite · Vitest (unidade) · Playwright (E2E/trace/screenshot/vídeo de falha) · GitHub Issues.

## Começar (VS Code / Windows / WSL)

**Pré-requisito:** Node.js 22.12+ e npm. Confira `node -v`. Evite Node 16 antigo deste projeto de faculdade.

```bash
npm.cmd install
npx.cmd playwright install chromium
npm.cmd run dev
```

Abra o endereço local indicado pelo Vite (geralmente `http://localhost:5173`). Para rodar os testes, use outro terminal:

```bash
npm.cmd run test:unit
npm.cmd run test:e2e
npm.cmd run test:e2e:ui
npm.cmd run test:e2e:report
```

Os testes que verificam os defeitos foram criados para **falhar quando o bug correspondente está presente**. Depois da correção, o teste deve passar. O estado atual da `main` já inclui a correção do BUG-001 (veja o case study); os demais cenários permanecem para investigação. Um teste smoke e um unitário simples foram concebidos para passar. Os testes E2E sobem a app automaticamente em uma porta separada (`4173`); não é necessário manter `npm run dev` para eles.

## Casos de teste / bugs simulados

| ID | Comportamento esperado | Arquivo da investigação |
|---|---|---|
| BUG-001 | Total = preço × quantidade de cada item | [BUG-001](docs/BUG-001.md) |
| BUG-002 | E-mail malformado não pode confirmar pedido | [BUG-002](docs/BUG-002.md) |
| BUG-003 | Dois cliques não podem criar dois pedidos | [BUG-003](docs/BUG-003.md) |

**Registro de progresso:** o BUG-001 foi investigado e corrigido localmente antes da publicação inicial do repositório. A [documentação do caso](docs/BUG-001.md) registra a falha, a causa raiz, o reteste e as evidências ainda pendentes de anexar. Esta PR de documentação não recria artificialmente um diff da correção.

[Plano de testes](docs/TEST_PLAN.md) · [Modelo de case study](docs/CASE_STUDY_TEMPLATE.md) · [Roteiro de vídeo](docs/VIDEO_SCRIPT.md)

## Fluxo de trabalho recomendado

1. Inicialize Git e salve a versão inicial (simulação com bugs). Crie branch **`lab/buggy`** como registro reproduzível.
2. Execute testes e preencha as versões / evidências reais nos relatórios.
3. Crie uma Issue por falha e associe os commits.
4. Abra uma branch de correção, conserte um bug por vez e execute regressão.
5. Mantenha **`main` corrigida**, com testes passando. Preserve `lab/buggy` apenas como referência da simulação.
6. Adicione GIF/prints e link do vídeo ao README. Não suba vídeos pesados nem artefatos locais gerados pelo Playwright sem necessidade.

### Dicas de depuração (sem spoiler completo)

- **BUG-001:** procure onde o total é agregado, e compare preço unitário com quantidade.
- **BUG-002:** examine a política de validação e entradas de fronteira (`x@`, `@dominio`, espaços).
- **BUG-003:** investigue a concorrência entre handlers assíncronos e o estado de submissão. Considere a diferença entre impedir cliques repetidos e garantir idempotência no backend.

## Como provar a competência
Mostre **antes → teste falha → análise → correção → teste passa**. Uma captura de terminal verde isolada não demonstra investigação. Os exemplos e relatórios são intencionalmente um ponto de partida: preencha somente com observações feitas por você.

**Code Shield · Quality & Debug Engineering Lab**
