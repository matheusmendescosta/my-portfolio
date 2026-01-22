import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://matheusmendes.dev';

  // Rotas estáticas principais
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          'pt-br': baseUrl,
          en: baseUrl,
        },
      },
    },
    {
      url: `${baseUrl}/brain`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          'pt-br': `${baseUrl}/brain`,
          en: `${baseUrl}/brain`,
        },
      },
    },
  ];

  let dynamicRoutes: MetadataRoute.Sitemap = [];

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (apiUrl) {
      const response = await fetch(`${apiUrl}/api/v1/posts`, {
        next: { revalidate: 3600 },
      });

      if (response.ok) {
        const data = await response.json();
        dynamicRoutes =
          data.posts?.map((post: { id: string; updatedAt: string }) => ({
            url: `${baseUrl}/brain/post/${post.id}`,
            lastModified: new Date(post.updatedAt),
            changeFrequency: 'weekly' as const,
            priority: 0.6,
          })) || [];
      }
    }
  } catch (error) {
    console.error('Erro ao buscar posts para sitemap:', error);
  }

  return [...staticRoutes, ...dynamicRoutes];
}
