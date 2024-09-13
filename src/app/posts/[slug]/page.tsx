import Container from '@/components/common/layout/Container';
import Gap from '@/components/common/layout/Gap';
import Wrapper from '@/components/common/layout/Wrapper/indext';
import MarkdownNav from '@/components/common/lib/MarkdownNav';
import { getPostBySlug, getPostSlugs } from '@/lib/post';
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
          업로드 날짜: {date.split('T')[0]}
        </span>
        <Gap size={4} />
        <hr />

        <Gap size={4} />
        <MarkdownNav markdown={content} />
        <MarkdownViewer markdown={content} />
      </Wrapper>
    </Container>
  );
}

export function generateStaticParams() {
  const slugs = getPostSlugs();
  console.log(slugs);

  return slugs.map((slug) => ({
    params: {
      slug,
    },
  }));
}
