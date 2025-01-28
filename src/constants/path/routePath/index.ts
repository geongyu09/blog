const ROUTE_PATH = {
  HOME: '/',
  ABOUT: '/about',
  POSTS: ({ tag }: { tag?: string }) => `/posts${tag ? `?tag=${tag}` : ''}`,
  POST_DETAIL: ({ slug }: { slug: string }) => `/post/${slug}`,
};

export default ROUTE_PATH;
