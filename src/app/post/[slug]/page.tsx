import Container from '@/components/common/layout/Container';
import Gap from '@/components/common/layout/Gap';
import Wrapper from '@/components/common/layout/Wrapper';
import MarkdownNav from '@/components/common/lib/MarkdownNav';
import SideTableOfContent from '@/components/feature/Post/SideTableOfContent';
import { getPostBySlug, getPostSlugs } from '@/lib/post/post';
import MarkdownViewer from '@/service/Markdown';

interface PageProps {
  params: {
    slug: string;
  };
}
export default function Page({ params: { slug } }: PageProps) {
  const {
    content,
    data: { date, title, description },
  } = getPostBySlug(slug);

  return (
    <Container>
      <Gap size={4} />

      <Wrapper padding={48}>
        <Gap size={12} />
        <h2 className="text-4xl font-bold">{title}</h2>
        <Gap size={4} />
        <p className="text-lg font-semibold opacity-90">{description}</p>
        <Gap size={2} />
        <span className="text-lg font-semibold opacity-70">
          {/* TODO: 업로드 형태 정하기 혹은 해당 로직을 함수로 빼기 */}
          업로드 날짜: {date.split('T')[0]}
        </span>
        <Gap size={4} />
        <hr />

        <Gap size={4} />
        <MarkdownNav markdown={content} />
        <hr />
        <MarkdownViewer markdown={content} />
      </Wrapper>
      <SideTableOfContent content={content} />
    </Container>
  );
}

export function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace('.md', ''),
  }));
}
