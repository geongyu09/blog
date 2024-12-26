import PostItem from '@/components/common/item/PostItem';
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
    <section className="flex flex-col gap-12">
      {filteredPosts.map(
        ({ slug, data: { date, description, title, tags, thumbnail } }) => (
          <PostItem
            key={`${slug}-${title}-${date}-${description}`}
            title={title}
            description={description}
            date={date}
            href={`/post/${slug}`}
            tagString={tags}
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
