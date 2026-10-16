# Evidências — BUG-001 | ShieldMart

> Capturas feitas durante a investigação local do defeito simulado de cálculo do carrinho. A falha foi reproduzida e corrigida antes do primeiro commit remoto. Esta galeria documenta o processo retrospectivamente.

## 1. Reprodução da falha

![Vitest — 1 teste aprovado e 2 falhando](01-testes-falhando.png)

## 2. Detalhamento das assertions

![Vitest — valores esperados e recebidos](02-detalhe-das-assertions.png)

## 3. Causa raiz no código original

![calculateTotal ignorava quantity](03-codigo-com-bug.png)

## 4. Correção implementada

![calculateTotal multiplica preço pela quantidade](04-codigo-corrigido.png)

## 5. Reteste dos testes unitários

![Vitest — 3 testes aprovados](05-reteste-tres-aprovados.png)

### Captura complementar

![Execução do Vitest no terminal após a correção](06-reteste-terminal-completo.png)

**Nota:** após o resultado aprovado na captura complementar, aparece um comando digitado incorretamente (`rub` em vez de `run`). O erro de digitação é posterior aos testes e não afeta seu resultado.

## Vídeo do debugging e teste E2E

- **Vídeo:** gravado localmente; link público ainda pendente.
- **Playwright E2E:** não foi demonstrado por estas capturas; não declarar aprovação sem execução.

[Voltar ao relatório BUG-001](../../BUG-001.md).
