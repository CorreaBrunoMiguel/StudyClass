# Riscos e Pendências (v1)

## Riscos

- Conteúdo em JSON exige disciplina de schema e validação (mas dá robustez).
- IA pode virar centro de custo se não limitar (precisa de rate limit e quotas).
- Retentativas e “melhor/última tentativa” podem causar disputa de regra se não definirmos cedo.

## Pendências (decisões futuras)

- Regra de nota da prova: usar melhor tentativa ou última tentativa (impacta comportamento do aluno).
- Implementar “refazer apenas questões erradas” (Alfa).
- Definir armazenamento do conteúdo JSON (DB vs arquivos no repo).
- Política detalhada de quotas de IA (números).
