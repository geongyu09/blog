import DefaultItem from '@/components/common/item/DefaultItem';
import ROUTE_PATH from '@/constants/path/routePath';
import { getAllPosts, getFilteredPostsByTag } from '@/lib/post/post';
import { Post } from '@/types/post';

interface PostsProps {
  filteredTag?: string;
}

export default function AllPostsSection({ filteredTag }: PostsProps) {
  const allPosts = getAllPosts();

  let filteredPosts: Post[] = [];

  if (filteredTag)
    filteredPosts = getFilteredPostsByTag(decodeURIComponent(filteredTag));
  else filteredPosts = allPosts;

  return (
    <section className="flex flex-col gap-4">
      {filteredPosts.map(
        ({ slug, data: { date, description, title, thumbnail } }) => (
          <DefaultItem
            key={`${slug}-${title}-${date}-${description}`}
            title={title}
            description={description}
            date={date}
            href={ROUTE_PATH.POST_DETAIL({ slug })}
            image={thumbnail}
          />
        ),
      )}
    </section>
  );
}

AllPostsSection.defaultProps = {
  filteredTag: undefined,
};
