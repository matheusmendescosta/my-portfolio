/* eslint-disable no-inline-comments */
export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://matheusmendes.dev';

  const llmsContent = `# Matheus Mendes - Portfolio

> Portfólio pessoal de Matheus Mendes, desenvolvedor de software baseado no Brasil.

## Sobre

Este é o portfólio profissional de Matheus Mendes, um desenvolvedor de software fullstack com experiência em diversas
 tecnologias modernas.

## Páginas

- [Home](${baseUrl}/): Página principal com informações sobre o desenvolvedor, experiências profissionais, 
projetos e educação.
- [Brain](${baseUrl}/brain): Blog com posts e artigos sobre tecnologia e desenvolvimento.

## Seções da Home

### Sobre (About)
Informações pessoais e profissionais do desenvolvedor.

### Experiência Profissional (Work Experience)
Histórico de trabalho com empresas como:
- Evotalks
- RBR Digital
- Orcafascio
- TNP Brasil
- Prosas

### Projetos (Projects)
Projetos desenvolvidos incluindo sistemas web e aplicações.

### Educação (Education)
Formação acadêmica e cursos realizados.

### Contato (Contact)
Formulário de contato e links para redes sociais (GitHub, LinkedIn).

## Tecnologias Utilizadas

O desenvolvedor trabalha com:
- **Frontend**: React, Next.js, TypeScript, Tailwind CSS, Material UI, Chakra UI
- **Backend**: Node.js, Express, Ruby on Rails
- **Banco de Dados**: PostgreSQL, MySQL, MongoDB
- **DevOps**: Docker, GitHub Actions
- **Mensageria**: Kafka, RabbitMQ

## Idiomas

O site está disponível em:
- Português (pt-br)
- Inglês (en)

## Contato

Para entrar em contato, utilize o formulário na página principal ou acesse os perfis nas redes sociais.

## API

O site possui endpoints de API para:
- \`/api/contact/me\`: Envio de mensagens de contato
- \`/api/health\`: Verificação de saúde da aplicação

---

*Este arquivo foi criado para fornecer contexto estruturado para Large Language Models (LLMs).*
`;

  return new Response(llmsContent, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
