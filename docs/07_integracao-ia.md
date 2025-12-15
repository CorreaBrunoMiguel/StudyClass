# Integração com IA (v1)

## Uso permitido no Beta

- Responder dúvidas em pontos definidos (blocos ai.prompt).
- Gerar feedback para respostas discursivas quando a interação estiver com grading.mode = "ai".

## Uso NÃO permitido no Beta

- IA gerar automaticamente o curso/módulo/capítulos por conta própria.
- IA criar provas sem ação explícita do ADMIN (admin sempre controla o conteúdo).

## Controle de custo/abuso (obrigatório)

- Implementar limites configuráveis (por exemplo):
  - limite por aluno/dia
  - limite por unidade/dia
  - limite por curso/dia
- Em caso de exceder limite: retornar mensagem clara e registrar evento.

## Dados enviados

- Apenas o necessário para responder/corrigir.
- Nunca enviar dados sensíveis desnecessários.
- Logar metadados (quem, quando, qual bloco), sem armazenar conteúdo sensível em logs.

## Pendência

- Definir valores exatos de limites (depende do orçamento de créditos).
