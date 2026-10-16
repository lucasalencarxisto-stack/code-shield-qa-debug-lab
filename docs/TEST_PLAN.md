# Plano de testes — ShieldMart QA Lab

**Tipo:** simulação controlada de QA e debugging, sem cliente ou dados reais.
**Escopo:** carrinho, validação de e-mail, finalização do pedido.
**Ambiente:** aplicação React + TypeScript local; Chromium / Playwright; Node compatível.

## Critérios de aceitação

| Caso | Ação | Resultado esperado | ID |
|---|---|---|---|
| CT-001 | Abrir a home | 3 produtos renderizados | SMOKE |
| CT-002 | Adicionar teclado e elevar quantidade para 2 | Total R$ 300,00 | BUG-001 |
| CT-003 | Submeter checkout com `cliente@` | Exibir erro, não criar pedido | BUG-002 |
| CT-004 | Dois cliques rápidos no botão Finalizar | Criar somente 1 pedido | BUG-003 |

## Procedimento e evidências

1. Execute `npm run test:unit` e `npm run test:e2e` na versão com defeitos.
2. Registre **resultados reais** com terminal, vídeo e screenshots (não invente métricas).
3. Reproduza manualmente cada falha pelo navegador e DevTools.
4. Crie uma GitHub Issue por BUG, anexando o relatório correspondente.
5. Corrija o código, execute os mesmos testes e registre os resultados.
6. Abra PR referenciando as Issues e preserve evidências do antes/depois.

**Importante:** o propósito de testes falharem no primeiro cenário é demonstrar detecção; o repositório final (branch `main`) deve ficar verde após correção. A branch `lab/buggy` documenta o ponto de partida.
