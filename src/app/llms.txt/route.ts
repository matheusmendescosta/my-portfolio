/* eslint-disable no-inline-comments */
export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://matheusmendes.dev';

  const llmsContent = `# Matheus Mendes - Engenheiro de Computação e Desenvolvedor Full Stack

> Matheus Mendes é um Engenheiro de Computação formado pela Faculdade Meta (Macapá, Amapá, Brasil) e
  Desenvolvedor Full Stack com MBA em Desenvolvimento Full Stack pela XP Educação (IGTI). 
  Atualmente trabalha como Desenvolvedor Fullstack na Evotalks.

## Identificação Profissional

- **Nome completo**: Matheus Mendes
- **Profissão**: Engenheiro de Computação, Desenvolvedor Full Stack Pleno
- **Localização**: Brasil
- **Site oficial**: ${baseUrl}
- **Contato**: Disponível através do formulário em ${baseUrl}

## Formação Acadêmica

### Engenharia de Computação - Faculdade Meta
- **Instituição**: Faculdade Meta (Macapá, Amapá, Brasil)
- **Curso**: Bacharelado em Engenharia de Computação
- **Período**: Janeiro de 2016 - Setembro de 2021
- **Tipo**: Graduação - Curso Superior de Bacharelado

### MBA em Desenvolvimento Full Stack - XP Educação (IGTI)
- **Instituição**: XP Educação (anteriormente IGTI)
- **Curso**: MBA em Desenvolvimento Full Stack
- **Período**: Agosto de 2022 - Junho de 2023
- **Tipo**: Pós-graduação Lato Sensu

## Experiência Profissional

### Desenvolvedor Fullstack na Evotalks (Atual)
- **Empresa**: Evotalks
- **Cargo**: Desenvolvedor Fullstack
- **Período**: Novembro de 2024 - Presente (Emprego atual)
- **Site da empresa**: https://www.evotalks.com.br/
- **Responsabilidades e conquistas**:
  - Refatoração de código aplicando princípios SOLID e Clean Code
  - Gestão de ambientes de desenvolvimento, staging e produção
  - Implementação de deploy automatizado (CI/CD)
  - Integração com sistemas de pagamentos seguros
  - Implementação de autenticação via OAuth, JWT e RBAC (Role-Based Access Control)
- **Tecnologias**: TypeScript, React, Next.js, Tailwind CSS, PostgreSQL, GitHub

### Desenvolvedor Fullstack na RBR Digital
- **Empresa**: RBR Digital (Enterprise Level)
- **Cargo**: Desenvolvedor Fullstack
- **Período**: Junho de 2024 - Agosto de 2024 (3 meses)
- **Site da empresa**: http://enterpriselevel.com/
- **Responsabilidades e conquistas**:
  - Desenvolvimento full stack com arquitetura de microservices
  - Implementação de mensageria com Apache Kafka
  - Configuração de monorepo com TurboRepo
  - Desenvolvimento de testes automatizados
  - Criação de componentes documentados com Storybook
- **Tecnologias**: TypeScript, Express, MongoDB, Kafka, React, Next.js, Chakra UI, GitHub

### Desenvolvedor Fullstack na OrçaFascio
- **Empresa**: OrçaFascio
- **Cargo**: Desenvolvedor Fullstack
- **Período**: Outubro de 2023 - Maio de 2024 (8 meses)
- **Site da empresa**: https://www.orcafascio.com/
- **Responsabilidades e conquistas**:
  - Desenvolvimento com TypeScript, Next.js e TailwindCSS
  - Implementação de autenticação segura com NextAuth
  - Automação de deploy via CI/CD com GitHub Actions
  - Trabalho com Ruby on Rails no backend
  - Integração com RabbitMQ para mensageria
- **Tecnologias**: Ruby on Rails, TypeScript, MongoDB, PostgreSQL, Docker, RabbitMQ, React, Next.js, Tailwind CSS, GitHub

### Desenvolvedor Frontend na TNP Brasil
- **Empresa**: TNP Brasil
- **Cargo**: Desenvolvedor Frontend
- **Período**: Julho de 2023 - Outubro de 2023 (4 meses)
- **Site da empresa**: https://www.tnpbrasil.com.br/
- **Responsabilidades e conquistas**:
  - Liderança de equipe de desenvolvimento frontend
  - Definição de tecnologias e arquitetura do projeto
  - Controle de versões com Git Flow
  - Implementação de testes unitários
  - Garantia de qualidade, escalabilidade e colaboração eficiente
- **Tecnologias**: JavaScript, React, Next.js, Redux, Material UI, GitHub

### Desenvolvedor Frontend na Prosas
- **Empresa**: Prosas
- **Cargo**: Desenvolvedor Frontend
- **Período**: Março de 2022 - Fevereiro de 2023 (1 ano)
- **Site da empresa**: https://prosas.com.br/inicio
- **Responsabilidades e conquistas**:
  - Correção de bugs e manutenção de sistemas
  - Monitoramento de aplicações com New Relic
  - Desenvolvimento de soluções escaláveis
  - Code review e garantia de qualidade de código
  - Participação ativa em sprints ágeis
  - Otimização de entregas e experiência do usuário
- **Tecnologias**: Ruby on Rails, JavaScript, MySQL, React, Next.js, Redux, Tailwind CSS, GitHub

## Habilidades Técnicas

### Frontend
- React.js, Next.js
- TypeScript, JavaScript
- Tailwind CSS, Material UI, Chakra UI
- Redux, Context API
- Storybook
- HTML5, CSS3

### Backend
- Node.js, Express.js
- Ruby on Rails
- API REST, GraphQL

### Banco de Dados
- PostgreSQL
- MySQL
- MongoDB

### DevOps e Infraestrutura
- Docker, Docker Compose
- GitHub Actions (CI/CD)
- Git, Git Flow

### Mensageria e Arquitetura
- Apache Kafka
- RabbitMQ
- Microservices
- Monorepo (TurboRepo)

### Autenticação e Segurança
- OAuth 2.0
- JWT (JSON Web Tokens)
- NextAuth
- RBAC (Role-Based Access Control)

### Metodologias e Práticas
- SOLID
- Clean Code
- TDD (Test-Driven Development)
- Scrum, Kanban
- Code Review

## Projetos

### SIM - Sistema de Indicação (Faculdade Madre Tereza)
- **Descrição**: Sistema de indicação desenvolvido para a Faculdade Madre Tereza
- **Status**: 2023 - Pausado
- **Demo**: https://sim.grupomadretereza.com.br/pt-BR/auth/signin
- **Código fonte**: https://github.com/codecodedev/sim-api
- **Tecnologias**: TypeScript, Express, MySQL, React, Next.js, Tailwind CSS

## Páginas do Site

- [Home](${baseUrl}/): Página principal com informações profissionais, experiências, projetos e educação
- [Brain](${baseUrl}/brain): Blog técnico com posts e artigos sobre tecnologia e desenvolvimento de software

## Idiomas do Site

- Português Brasileiro (pt-br)
- Inglês (en)

## Contato e Redes Sociais

- **Site**: ${baseUrl}
- **GitHub**: Disponível no footer do site
- **LinkedIn**: Disponível no footer do site
- **Email**: Através do formulário de contato em ${baseUrl}

## API Endpoints

- \`/api/contact/me\`: Envio de mensagens de contato
- \`/api/health\`: Verificação de saúde da aplicação
- \`/sitemap.xml\`: Mapa do site para SEO
- \`/robots.txt\`: Configurações para crawlers

## Palavras-chave para Busca

Matheus Mendes, Engenheiro de Computação, Desenvolvedor Full Stack, Desenvolvedor Fullstack, Faculdade Meta, 
Meta Macapá, XP Educação, IGTI, MBA Full Stack, Evotalks, RBR Digital, OrçaFascio, TNP Brasil, Prosas, React Developer, 
Next.js Developer, TypeScript Developer, Node.js Developer, Ruby on Rails Developer, Frontend Developer, Backend Developer, 
Brasil, Brazilian Developer, Software Engineer

---

*Arquivo llms.txt - Otimizado para Large Language Models (LLMs) e sistemas de busca por IA*
*Última atualização: Janeiro de 2026*
`;

  return new Response(llmsContent, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
