# Formato do Conteúdo Interativo (JSON) (v1)

docs/06_formato-conteudo.md

## Decisão

- O conteúdo das aulas será armazenado em **Postgres (JSONB)** por unidade.
- A unidade mínima de interação (folha) é:
  - Capítulo, quando não houver subcapítulos
  - Subcapítulo, quando houver

## Estrutura do conteúdo (schemaVersion 1)

Cada unidade folha tem um JSON com:

- schemaVersion: número
- unitId: UUID
- title: string
- blocks: array ordenado

## Blocos mínimos do Beta

### Conteúdo

- heading
- paragraph
- list
- callout (info/warn/tip)

### Interações (geram participação / acerto quando aplicável)

- interaction.multipleChoice (corrigível)
- interaction.trueFalse (corrigível)
- interaction.number (corrigível)
- interaction.shortText (pode ser corrigível via IA se configurado)

### IA

- ai.prompt (pontos explícitos para tirar dúvidas/feedback)

## Regras de participação e acerto

- Para NotaParticipação:
  - contar somente blocos com `requiredForParticipation: true`
- Para NotaParticipaçãoAcerto:
  - contar somente blocos corrigíveis (answerKey ou grading.mode definido)
- Blocos discursivos só contam como “acerto” se `grading.mode = "ai"` e houver retorno de avaliação.

## Exemplo de bloco (múltipla escolha)

{
"type": "interaction.multipleChoice",
"id": "q1",
"prompt": "Pergunta?",
"choices": [{"id":"a","text":"A"},{"id":"b","text":"B"}],
"answerKey": ["b"],
"requiredForParticipation": true
}

## Observação

- O schema deve ser validado no backend (validação + versionamento).
- Ao salvar conteúdo, o backend deve pré-calcular e guardar:
  - totalRequiredInteractions
  - totalGradableInteractions
    para evitar reprocessar JSON a toda hora.
