# Regras de Negócio (v1)

## RB01 — Ordem e progressão (curso)

- Cursos têm uma lista ordenada de módulos.
- O aluno deve seguir a ordem definida.
- Só acessa o módulo N+1 se o módulo N estiver APROVADO (nota >= 70).

## RB02 — Ordem e progressão (módulo)

- Módulos têm capítulos ordenados.
- Capítulo pode:
  - Ser “folha” (não tem subcapítulos) → avaliável diretamente.
  - Ser agregador (tem subcapítulos) → cada subcapítulo é folha e avaliável.
- O aluno segue a ordem das unidades folha; só acessa a próxima unidade folha após concluir a atual.

## RB03 — Conclusão de unidade

- Uma unidade folha é considerada concluída quando:
  - O aluno realizou a prova da unidade ao menos 1 vez.
  - E o sistema registrou NotaUnidade (mesmo que < 70).

## RB04 — Aprovação de módulo

- Um módulo é aprovado se NotaMódulo >= 70.

## RB05 — Retentativas de prova

- O aluno pode refazer a prova de uma unidade folha.
- O sistema registra número de tentativas.
- Sem punição por tentativa; é informação e histórico.

## RB06 — Reaproveitamento de módulos entre cursos

- Módulos são identificados por ID global.
- Se o aluno já aprovou um módulo (ID global), esse módulo conta como concluído em qualquer curso que o exija.
- Se o módulo for alterado mantendo o mesmo ID global, o histórico anterior do aluno permanece válido.

## RB07 — Certificados / badges

- Ao aprovar um módulo, o aluno recebe um badge/certificado de módulo.
- Ao cumprir todos os módulos exigidos por um curso (aprovados ou reaproveitados), o aluno recebe certificado de curso.
