# Formato do Conteúdo Interativo (JSON) (v1)

## Premissas

- A interação aluno/aplicação ocorre sempre na unidade folha (capítulo sem subcapítulos OU subcapítulo).
- O conteúdo da unidade é um JSON composto por blocos renderizáveis.
- O schema é extensível: novos tipos de blocos podem ser adicionados sem quebrar conteúdo antigo.

## Estrutura base (proposta v1)

Cada unidade folha possui:

- metadata (id, título, versão, etc.)
- blocks: lista ordenada de blocos

### Exemplo (v1)

```json
{
  "schemaVersion": 1,
  "unitId": "unit-uuid",
  "title": "Título da Aula",
  "blocks": [
    { "type": "paragraph", "id": "b1", "text": "Texto..." },
    { "type": "callout", "id": "b2", "variant": "info", "title": "Aviso", "text": "..." },
    {
      "type": "interaction.multipleChoice",
      "id": "q1",
      "prompt": "Pergunta?",
      "choices": [
        { "id": "a", "text": "Opção A" },
        { "id": "b", "text": "Opção B" }
      ],
      "answerKey": ["b"],
      "requiredForParticipation": true
    },
    {
      "type": "interaction.shortText",
      "id": "q2",
      "prompt": "Explique em 2 linhas...",
      "grading": { "mode": "ai", "rubric": "clareza e correção conceitual" },
      "requiredForParticipation": true
    },
    {
      "type": "ai.prompt",
      "id": "ai1",
      "purpose": "doubt_help",
      "systemHint": "Responda como tutor sereno e objetivo.",
      "userPromptTemplate": "Dúvida do aluno: {{studentText}}"
    }
  ]
}
```

## Tipos de blocos (mínimo Beta)

Conteúdo:

- paragraph
- heading
- list
- image (opcional no Beta)
- callout (info/warn/tip)

Interações (participação/acerto):

- interaction.multipleChoice (corrigível)
- interaction.trueFalse (corrigível)
- interaction.number (corrigível)
- interaction.shortText (pode ser corrigível via IA quando configurado)

IA:

- ai.prompt (pontos fixos de chamada)

## Eventos e rastreabilidade

Cada bloco de interação deve gerar eventos:

- preenchido (participação)
- avaliado (acerto/erro quando aplicável)
- ia_called (quando houver)

## Pendências obrigatórias antes da implementação

- Decidir onde o JSON será armazenado no Beta:
  - Opção 1: armazenar no banco (campo JSON por unidade)
  - Opção 2: armazenar em arquivos versionados no repositório e carregar no runtime
