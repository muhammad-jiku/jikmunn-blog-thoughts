import CardCategory from '@/components/CardCategory';
import Container from '@/components/Container';
import Header from '@/components/Header';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPosts } from '../utils';

export async function generateStaticParams() {
  const posts = await getBlogPosts();

  return posts.map((post) => ({
    // slug: post.slug,
    category: post.metadata.category,
  }));
}

export function generateMetadata({ params }: { params: { category: string } }) {
  const { category } = params;

  return {
    title: category.toLocaleUpperCase(),
    description: `All articles reagarding ${category}`,
  };
}

export default async function Page({
  params,
}: {
  params: {
    category: string;
  };
}) {
  const posts = await getBlogPosts().filter(
    (post) => post.metadata.category === params.category
  );

  if (!posts.length) {
    notFound();
  }

  return (
    <>
      <Header>
        <Container>
          <h1 className='title font-semibold text-2xl tracking-wider mt-4 uppercase'>
            {posts[0]?.metadata.category}
          </h1>
        </Container>
      </Header>
      <Container>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10'>
          {posts
            .sort((a, b) => {
              if (
                new Date(a.metadata.publishedAt) >
                new Date(b.metadata.publishedAt)
              ) {
                return -1;
              }
              return 1;
            })
            .map((post) => (
              <Link
                href={`/blog/${post.metadata.category}/${post.slug}`}
                key={post.slug}
              >
                <CardCategory
                  title={post.metadata.title}
                  summary={post.metadata.summary}
                  date={post.metadata.publishedAt}
                />
              </Link>
            ))}
        </div>
      </Container>
    </>
  );
}
