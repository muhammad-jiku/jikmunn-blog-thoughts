import { POSTS } from '@/lib/constants';
import { getBlogPosts } from './blog/utils';

// export const baseUrl = 'https://next-blog-cj.vercel.app';
export const baseUrl = 'http://localhost:3000';

export default async function sitemap() {
  const blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.metadata.category}/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const routes = POSTS.map((route) => ({
    url: `${baseUrl}${route.href}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...blogs, ...routes];
}
