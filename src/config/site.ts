type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
};

export const siteConfig: SiteConfig = {
  name: 'Blog Thoughts',
  description:
    'An Open source Technical Blog platform with Next.js 14 with shadcn/ui, prisma and markdown support.',
  //   url: 'https://next-blog-cj.vercel.app/',
  //   ogImage: 'https://next-blog-cj.vercel.app/og',
  url: 'http://localhost:3000/',
  ogImage: 'http://localhost:3000/og',
  links: {
    twitter: 'https://x.com/muhammadjiku364',
    github: 'https://github.com/muhammad-jiku/',
  },
};
