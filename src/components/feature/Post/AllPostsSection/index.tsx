import DefaultItem from '@/components/common/item/DefaultItem';
import { getAllPosts } from '@/lib/post/post';
import { Post } from '@/types/post';

interface PostsProps {
  filteredTag?: string;
}
export default function AllPostsSection({ filteredTag }: PostsProps) {
  const allPosts = getAllPosts();

  let filteredPosts: Post[] = [];

  if (filteredTag)
    filteredPosts = allPosts.filter(
      ({ data: { tags } }) => tags.indexOf(filteredTag) !== -1,
    );
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
            href={`/post/${slug}`}
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
