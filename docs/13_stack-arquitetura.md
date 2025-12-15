# Stack e Arquitetura — Decisão pendente (v1)

docs/13_stack-arquitetura.md

## Frontend (decidido)

- React (recomendação: Next.js para roteamento, SSR opcional e organização)

## Backend (pendente)

Opção A — Node (TypeScript) + Postgres

- Prós: velocidade de iteração, DTO/validação, bom encaixe com JSON schema e API rápida
- Contras: disciplina necessária pra arquitetura “robusta”

Opção B — Spring Boot (Java) + Postgres

- Prós: robustez clássica, ecossistema maduro, ótimo pra domínio/regras
- Contras: mais boilerplate e tempo pra scaffold

## Banco

- Postgres (JSONB para conteúdo/provas)

## Observabilidade mínima (Beta)

- logs estruturados
- rastreio de erros
- auditoria de tentativas/notas e IA
