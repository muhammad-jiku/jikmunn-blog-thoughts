import { baseUrl } from '@/app/sitemap';
import { BreadcrumbWithCustomSeparator } from '@/components/BreadCrumb';
import Container from '@/components/Container';
import Header from '@/components/Header';
import { CustomMDX } from '@/components/mdx';
import ReportViews from '@/components/ReportViews';
import { notFound } from 'next/navigation';
import { formatDate, getBlogPosts } from '../../utils';

export async function generateStaticParams() {
  const posts = await getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
    category: post.metadata.category,
  }));
}

export function generateMetadata({
  params,
}: {
  params: {
    slug: string;
    category: string;
  };
}) {
  const post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) return;

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.metadata.category}/${post.slug}`,
      images: [{ url: image || `${baseUrl}/og?title=${title}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image || `${baseUrl}/og?title=${title}`],
    },
  };
}

export default async function Page({
  params,
}: {
  params: {
    category: string;
    slug: string;
  };
}) {
  const post = await getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <script
        type='application/ld+json'
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.metadata.category}/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'Blog Thoughts',
            },
          }),
        }}
      />
      <ReportViews
        category={post.metadata.category}
        title={post.metadata.title}
        slug={post.slug}
      />
      <Header>
        <Container>
          <BreadcrumbWithCustomSeparator
            category={post.metadata.category}
            slug={post.slug}
          />
          <h1 className='title font-semibold text-2xl tracking-tighter mt-4'>
            {post.metadata.title}
          </h1>
          <div className='flex justify-between items-center mt-2 mb-4 text-sm'>
            <p className='text-sm text-neutral-600 dark:text-neutral-400 mt-2'>
              {formatDate(post.metadata.publishedAt)}
            </p>
          </div>
        </Container>
      </Header>
      <Container>
        <article className='prose'>
          <CustomMDX source={post.content} />
        </article>
      </Container>
    </>
  );
}
