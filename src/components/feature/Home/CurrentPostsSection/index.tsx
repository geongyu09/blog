import PostItem from '@/components/common/item/PostItem';
import { getCurrentPosts } from '@/lib/post/post';

interface CurrentPostsSectionProps {
  amount: number;
}

export default function CurrentPostsSection({
  amount,
}: CurrentPostsSectionProps) {
  const posts = getCurrentPosts(amount);

  return (
    <section className="flex flex-col gap-12">
      {posts.map(
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
