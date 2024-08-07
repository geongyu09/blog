import { Post } from '@/types/post';

interface DefaultItemProps extends Post {}
export default function DefaultItem({ content, data }: DefaultItemProps) {
  return (
    <div>
      <p>{data.title}</p>
      <p>{content}</p>
    </div>
  );
}
