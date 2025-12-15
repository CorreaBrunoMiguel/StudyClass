# Avaliação e Notas (v1)

## Escalas

- Todas as notas são 0–100.
- Aprovação: >= 70.

## NotaParticipação (unidade folha)

- Definição: percentual de interações preenchidas pelo aluno.
- Cálculo: (interaçõesPreenchidas / interaçõesTotais) \* 100
- Ex.: 7 de 10 = 70

## NotaParticipaçãoAcerto (unidade folha)

- Definição: percentual de acertos em interações corrigíveis.
- Cálculo: (acertos / totalCorrigíveis) \* 100
- Ex.: 6 de 10 = 60
- Observação: interações discursivas podem ser “corrigíveis” via IA apenas quando explicitamente configurado.

## NotaProva (unidade folha)

- Prova sempre ao final da unidade folha.
- Número de questões: 5 <= N <= 50
- NotaProva é 0–100.

## NotaUnidade (unidade folha)

Fórmula:
NotaUnidade = (0.1 _ NotaParticipação) + (0.2 _ NotaParticipaçãoAcerto) + (0.7 \* NotaProva)

## NotaCapítulo

- Se capítulo NÃO possui subcapítulos: NotaCapítulo = NotaUnidade (do capítulo).
- Se capítulo possui subcapítulos: NotaCapítulo = média das notas dos subcapítulos:
  NotaCapítulo = (Σ NotaUnidadeSubcap) / N

## NotaMódulo

- NotaMódulo = média das notas dos capítulos:
  NotaMódulo = (Σ NotaCapítulo) / N

## Observações (pendências futuras)

- Regra de “melhor tentativa” vs “última tentativa” para prova: TODO (decisão do produto).
- Opção de refazer apenas questões erradas: TODO (Alfa).
