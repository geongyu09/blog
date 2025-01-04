import PostItem from '@/components/common/item/PostItem';
import ROUTE_PATH from '@/constants/path/routePath';
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
      {posts.map(({ slug, data: { date, description, title, thumbnail } }) => (
        <PostItem
          key={`${slug}-${title}-${date}-${description}`}
          title={title}
          description={description}
          date={date}
          href={ROUTE_PATH.POST_DETAIL({ slug })}
          image={thumbnail}
        />
      ))}
    </section>
  );
}
