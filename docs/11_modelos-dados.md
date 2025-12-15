# Modelo de Dados (v1) — StudyClass

docs/11_modelo-dados.md

## Convenções

- IDs: UUID
- Banco: Postgres
- Conteúdo da unidade: JSONB
- Módulo é global e reutilizável entre cursos via `module_id` (ID global)

## Entidades

### users

- id (UUID, PK)
- email (unique)
- password_hash (nullable se social-only)
- role (enum: ALUNO | ADMIN)
- created_at, updated_at

### email_whitelist

- email (PK)
- enabled (bool)
- created_at
  Regras:
- cadastro/login permitido somente se email estiver enabled=true

### courses

- id (UUID, PK)
- title
- description
- created_at, updated_at

### modules

- id (UUID, PK) ← ID global do módulo
- title
- description
- created_at, updated_at

### course_modules (ordem do curso)

- course_id (FK courses)
- module_id (FK modules)
- position (int)
  PK: (course_id, module_id)
  Regras:
- position define ordem do curso

### chapters (ordem dentro do módulo)

- id (UUID, PK)
- module_id (FK modules)
- title
- position (int)
- has_subchapters (bool)
- created_at, updated_at

### subchapters (opcional)

- id (UUID, PK)
- chapter_id (FK chapters)
- title
- position (int)
- created_at, updated_at

## Unidade folha (regra de modelagem)

- Se chapter.has_subchapters = false → a unidade folha é o CHAPTER
- Se chapter.has_subchapters = true → as unidades folha são os SUBCHAPTERS

### unit_content

Armazena o JSON da aula para unidades folha.

- id (UUID, PK)
- unit_type (enum: CHAPTER | SUBCHAPTER)
- unit_id (UUID) ← referencia chapter.id ou subchapter.id
- schema_version (int)
- content_json (JSONB)
- total_required_interactions (int)
- total_gradable_interactions (int)
- version (int) (incremental)
- created_at, updated_at
  Constraint:
- unique(unit_type, unit_id, version) (ou manter apenas “current” e histórico depois)

### unit_exam (prova da unidade folha)

- id (UUID, PK)
- unit_type (CHAPTER | SUBCHAPTER)
- unit_id (UUID)
- version (int)
- exam_json (JSONB) ← questões, gabarito, etc.
- created_at, updated_at

## Progresso / notas

### enrollments

- id (UUID, PK)
- user_id (FK users)
- course_id (FK courses)
- created_at
  Constraint:
- unique(user_id, course_id)

### unit_attempts

Registra tentativa de prova e métricas da unidade folha (participação/acerto).

- id (UUID, PK)
- user_id
- unit_type
- unit_id
- attempt_number (int)
- participation_score (0–100)
- participation_accuracy_score (0–100)
- exam_score (0–100)
- final_unit_score (0–100) ← fórmula oficial
- created_at
  Regras:
- exam_score válido para “melhor tentativa” = MAX(exam_score)
- final_unit_score pode ser recalculado por tentativa, mas o “status” usa melhor tentativa para exam_score

### module_results

Consolidação por módulo (por usuário).

- id (UUID, PK)
- user_id
- module_id
- module_score (0–100)
- approved (bool)
- computed_at
  Constraint:
- unique(user_id, module_id)

### course_certificates

- id (UUID, PK)
- user_id
- course_id
- issued_at
  Constraint:
- unique(user_id, course_id)

### module_badges

- id (UUID, PK)
- user_id
- module_id
- issued_at
  Constraint:
- unique(user_id, module_id)

## IA (controle de créditos)

### ai_usage_log

- id (UUID, PK)
- user_id
- unit_type, unit_id, block_id
- purpose (string)
- tokens_in, tokens_out (int, nullable)
- cost_estimated (numeric, nullable)
- created_at

### ai_quota

- user_id (PK)
- daily_limit_calls (int)
- daily_limit_tokens (int, opcional)
- updated_at
