const ROUTE_PATH = {
  HOME: '/',
  ABOUT: '/about',
  POSTS: (prop?: { tag?: string }) =>
    `/posts${prop?.tag ? `/${prop.tag}` : ''}`,
  POST_DETAIL: ({ slug }: { slug: string }) => `/post/${slug}`,
};

export default ROUTE_PATH;
