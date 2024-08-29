import Container from '@/components/common/layout/Container';
import Gap from '@/components/common/layout/Gap';
import Wrapper from '@/components/common/layout/Wrapper/indext';
import { getPostBySlug } from '@/lib/post';
import MakrdownVidwer from '@/service/Markdown';

interface PageProps {
  params: {
    slug: string;
  };
}
export default function Page({ params: { slug } }: PageProps) {
  const {
    content,
    data: { date, title, thumbnail },
  } = getPostBySlug(slug);

  return (
    <Container>
      <Gap size={4} />
      <div
        className="h-[500px] bg-slate-200 rounded-md"
        style={{
          backgroundImage: `url(${thumbnail})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <Wrapper padding={36}>
        <Gap size={12} />
        <h2 className="text-4xl font-bold">{title}</h2>
        <Gap size={8} />
        <span className="text-lg font-semibold opacity-70">
          업로드 날짜: {date.split('T')[0]}
        </span>
        <Gap size={4} />
        <hr />

        <Gap size={4} />
        <MakrdownVidwer>{content}</MakrdownVidwer>
      </Wrapper>
    </Container>
  );
}
