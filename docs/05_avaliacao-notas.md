# Avaliação e Notas (v1)

docs/05_avaliacao_notas.md

## Escalas

- Todas as notas são 0–100.
- Aprovação (módulo): >= 70.

## NotaParticipação (unidade folha)

- Percentual de interações preenchidas pelo aluno na unidade.
- Cálculo: (preenchidas / totais) \* 100

## NotaParticipaçãoAcerto (unidade folha)

- Percentual de acertos nas interações corrigíveis da unidade.
- Cálculo: (acertos / corrigíveis) \* 100

## Prova (unidade folha)

- Toda unidade folha possui prova ao final.
- Número de questões: 5 <= N <= 50
- NotaProva é 0–100.

## Regra de tentativas (prova)

- A prova pode ser refeita.
- A nota válida da prova é a **melhor tentativa** (maior nota obtida até o momento).
- Tentativas são registradas (sem punição).

## NotaUnidade (unidade folha)

NotaUnidade = (0.1 _ NotaParticipação) + (0.2 _ NotaParticipaçãoAcerto) + (0.7 \* NotaProvaValida)

## NotaCapítulo

- Se capítulo NÃO possui subcapítulos: NotaCapítulo = NotaUnidade (do capítulo).
- Se capítulo possui subcapítulos: NotaCapítulo = média das notas dos subcapítulos:
  NotaCapítulo = (Σ NotaUnidadeSubcap) / N

## NotaMódulo

- NotaMódulo = média das notas dos capítulos:
  NotaMódulo = (Σ NotaCapítulo) / N
