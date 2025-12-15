# Requisitos (v1)

docs/03_requisitos.md

## Funcionais (RF)

RF01. Cadastro/login por e-mail e senha.  
RF02. Login social via Google.  
RF03. Controle de acesso por whitelist de e-mails (Beta).  
RF04. ADMIN cria/edita cursos.  
RF05. ADMIN cria/edita módulos (ID global).  
RF06. ADMIN cria/edita capítulos e subcapítulos.  
RF07. ADMIN define trilha (ordem) de módulos no curso e ordem de capítulos/subcapítulos no módulo.  
RF08. ADMIN cria/edita conteúdo interativo em JSON (blocos).  
RF09. ADMIN cria/edita provas por unidade folha.  
RF10. ALUNO se matricula em curso (apenas após acesso permitido).  
RF11. ALUNO segue trilha: só acessa unidade N+1 se N concluída.  
RF12. ALUNO só acessa módulo N+1 se módulo N aprovado (>=70).  
RF13. Cada unidade folha gera nota e status (concluída).  
RF14. Provas podem ser refeitas; tentativas são registradas sem punição.  
RF15. Reaproveitamento de módulos: se módulo (ID global) já aprovado, vale em outros cursos que exigirem o mesmo módulo.  
RF16. Histórico do aluno: progresso por curso, módulos aprovados, notas, tentativas.  
RF17. Certificado/badge por módulo aprovado.  
RF18. Certificado de curso ao concluir todos os módulos exigidos (incluindo reaproveitados).  
RF19. Integração com IA apenas em blocos definidos do conteúdo (dúvidas/feedback discursivo etc.).

## Não-funcionais (RNF)

RNF01. UI limpa, serena, responsiva e acessível (mínimo WCAG básico).  
RNF02. Backend consistente e rastreável (tentativas/notas auditáveis).  
RNF03. Segurança: autenticação e autorização por perfil (ALUNO/ADMIN).  
RNF04. Controle de custos/abuso de IA (limites configuráveis).  
RNF05. Observabilidade mínima (logs estruturados + rastreio de erros).  
RNF06. Conteúdo versionável/evolutivo (schema extensível).
