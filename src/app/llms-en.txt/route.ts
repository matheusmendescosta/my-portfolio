/* eslint-disable no-inline-comments */
export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://matheusmendes.dev';

  const llmsContent = `# Matheus Mendes - Computer Engineer and Full Stack Developer

> Matheus Mendes is a Computer Engineer graduated from Faculdade Meta (Macapá, Amapá, Brazil) and a 
 Full Stack Developer with an MBA in Full Stack Development from XP Educação (IGTI). 
 Currently working as a Fullstack Developer at Evotalks.

## Professional Identification

- **Full name**: Matheus Mendes
- **Profession**: Computer Engineer, Mid-Level Full Stack Developer
- **Location**: Brazil
- **Official website**: ${baseUrl}
- **Contact**: Available through the form at ${baseUrl}

## Academic Background

### Computer Engineering - Faculdade Meta
- **Institution**: Faculdade Meta (Macapá, Amapá, Brazil)
- **Degree**: Bachelor's Degree in Computer Engineering
- **Period**: January 2016 - September 2021
- **Type**: Undergraduate - Bachelor's Degree

### MBA in Full Stack Development - XP Educação (IGTI)
- **Institution**: XP Educação (formerly IGTI)
- **Degree**: MBA in Full Stack Development
- **Period**: August 2022 - June 2023
- **Type**: Postgraduate Specialization

## Professional Experience

### Fullstack Developer at Evotalks (Current)
- **Company**: Evotalks
- **Position**: Fullstack Developer
- **Period**: November 2024 - Present (Current job)
- **Company website**: https://www.evotalks.com.br/
- **Responsibilities and achievements**:
  - Code refactoring applying SOLID principles and Clean Code
  - Environment management for development, staging, and production
  - Implementation of automated deployment (CI/CD)
  - Integration with secure payment systems
  - Implementation of authentication via OAuth, JWT, and RBAC (Role-Based Access Control)
- **Technologies**: TypeScript, React, Next.js, Tailwind CSS, PostgreSQL, GitHub

### Fullstack Developer at RBR Digital
- **Company**: RBR Digital (Enterprise Level)
- **Position**: Fullstack Developer
- **Period**: June 2024 - August 2024 (3 months)
- **Company website**: http://enterpriselevel.com/
- **Responsibilities and achievements**:
  - Full stack development with microservices architecture
  - Implementation of messaging with Apache Kafka
  - Monorepo configuration with TurboRepo
  - Development of automated tests
  - Creation of documented components with Storybook
- **Technologies**: TypeScript, Express, MongoDB, Kafka, React, Next.js, Chakra UI, GitHub

### Fullstack Developer at OrçaFascio
- **Company**: OrçaFascio
- **Position**: Fullstack Developer
- **Period**: October 2023 - May 2024 (8 months)
- **Company website**: https://www.orcafascio.com/
- **Responsibilities and achievements**:
  - Development with TypeScript, Next.js, and TailwindCSS
  - Implementation of secure authentication with NextAuth
  - Deployment automation via CI/CD with GitHub Actions
  - Backend work with Ruby on Rails
  - Integration with RabbitMQ for messaging
- **Technologies**: Ruby on Rails, TypeScript, MongoDB, PostgreSQL, Docker, RabbitMQ, React, Next.js, Tailwind CSS, GitHub

### Frontend Developer at TNP Brasil
- **Company**: TNP Brasil
- **Position**: Frontend Developer
- **Period**: July 2023 - October 2023 (4 months)
- **Company website**: https://www.tnpbrasil.com.br/
- **Responsibilities and achievements**:
  - Frontend development team leadership
  - Technology and project architecture definition
  - Version control with Git Flow
  - Implementation of unit tests
  - Ensuring quality, scalability, and efficient collaboration
- **Technologies**: JavaScript, React, Next.js, Redux, Material UI, GitHub

### Frontend Developer at Prosas
- **Company**: Prosas
- **Position**: Frontend Developer
- **Period**: March 2022 - February 2023 (1 year)
- **Company website**: https://prosas.com.br/inicio
- **Responsibilities and achievements**:
  - Bug fixing and system maintenance
  - Application monitoring with New Relic
  - Development of scalable solutions
  - Code review and code quality assurance
  - Active participation in agile sprints
  - Optimization of deliveries and user experience
- **Technologies**: Ruby on Rails, JavaScript, MySQL, React, Next.js, Redux, Tailwind CSS, GitHub

## Technical Skills

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
- REST API, GraphQL

### Databases
- PostgreSQL
- MySQL
- MongoDB

### DevOps and Infrastructure
- Docker, Docker Compose
- GitHub Actions (CI/CD)
- Git, Git Flow

### Messaging and Architecture
- Apache Kafka
- RabbitMQ
- Microservices
- Monorepo (TurboRepo)

### Authentication and Security
- OAuth 2.0
- JWT (JSON Web Tokens)
- NextAuth
- RBAC (Role-Based Access Control)

### Methodologies and Practices
- SOLID
- Clean Code
- TDD (Test-Driven Development)
- Scrum, Kanban
- Code Review

## Projects

### SIM - Referral System (Faculdade Madre Tereza)
- **Description**: Referral system developed for Faculdade Madre Tereza
- **Status**: 2023 - Paused
- **Demo**: https://sim.grupomadretereza.com.br/pt-BR/auth/signin
- **Source code**: https://github.com/codecodedev/sim-api
- **Technologies**: TypeScript, Express, MySQL, React, Next.js, Tailwind CSS

## Website Pages

- [Home](${baseUrl}/): Main page with professional information, experiences, projects, and education
- [Brain](${baseUrl}/brain): Technical blog with posts and articles about technology and software development

## Website Languages

- Brazilian Portuguese (pt-br)
- English (en)

## Contact and Social Media

- **Website**: ${baseUrl}
- **GitHub**: Available in the website footer
- **LinkedIn**: Available in the website footer
- **Email**: Through the contact form at ${baseUrl}

## API Endpoints

- \`/api/contact/me\`: Contact message submission
- \`/api/health\`: Application health check
- \`/sitemap.xml\`: Site map for SEO
- \`/robots.txt\`: Crawler configurations

## Search Keywords

Matheus Mendes, Computer Engineer, Full Stack Developer, Fullstack Developer, Faculdade Meta, 
Meta Macapá, XP Educação, IGTI, MBA Full Stack, Evotalks, RBR Digital, OrçaFascio, TNP Brasil, Prosas, React Developer, 
Next.js Developer, TypeScript Developer, Node.js Developer, Ruby on Rails Developer, Frontend Developer, Backend Developer, 
Brazil, Brazilian Developer, Software Engineer, Brazilian Software Engineer, South America Developer

---

*llms.txt file - Optimized for Large Language Models (LLMs) and AI search systems*
*Last updated: January 2026*
`;

  return new Response(llmsContent, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
