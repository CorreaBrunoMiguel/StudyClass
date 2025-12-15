# API (v1) — Contratos iniciais (REST)

docs/12_apis.md

## Auth

- POST /auth/signup
- POST /auth/login
- GET /auth/me
- GET /auth/google/start
- GET /auth/google/callback

Regras:

- signup/login só permitem se email estiver na whitelist.
- role controla acesso ADMIN.

## Whitelist (ADMIN)

- GET /admin/whitelist
- POST /admin/whitelist (add email)
- PATCH /admin/whitelist/{email} (enable/disable)
- DELETE /admin/whitelist/{email}

## Cursos / matrícula

- GET /courses
- GET /courses/{courseId}
- POST /courses/{courseId}/enroll

## Conteúdo e trilhas (ALUNO)

- GET /me/courses
- GET /me/courses/{courseId}/progress

- GET /modules/{moduleId}
- GET /units/{unitType}/{unitId} (retorna content_json + estado do aluno)
- POST /units/{unitType}/{unitId}/interactions/{blockId}/answer (salva resposta)
- POST /units/{unitType}/{unitId}/exam/submit (submete prova)

## Admin CRUD (ADMIN)

- CRUD /admin/courses
- CRUD /admin/modules
- CRUD /admin/modules/{moduleId}/chapters
- CRUD /admin/chapters/{chapterId}/subchapters

- PUT /admin/units/{unitType}/{unitId}/content (salva JSONB + valida + pré-calcula contagens)
- PUT /admin/units/{unitType}/{unitId}/exam (salva prova JSONB)

## IA

- POST /ai/prompt
  Regras:
- exige quota disponível (ai_quota + ai_usage_log)
- registra ai_usage_log
