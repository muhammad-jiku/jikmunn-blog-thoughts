import Container from '@/components/Container';
import { MainNav } from '@/components/main-nav';
import { CustomMDX } from '@/components/mdx';
import { Metadata } from 'next';
import { getTermsOfServices } from '../blog/utils';

export const metadata: Metadata = {
  title: 'Terms Of Services',
  description: 'This page explains the terms of use of the site.',
};

export default function Page() {
  const post = getTermsOfServices().find(
    (post) => post.slug === 'terms-of-services'
  );

  return (
    <Container>
      <MainNav />
      <article className='prose'>
        <CustomMDX source={post?.content} />
      </article>
    </Container>
  );
}
