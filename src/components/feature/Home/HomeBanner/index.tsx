import Container from '@/components/common/layout/Container';
import Gap from '@/components/common/layout/Gap';
import Link from 'next/link';

export default function HomeBanner() {
  return (
    <div className="bg-[#f1f1f1] group select-none">
      <Container>
        <Link href="/portfolio" className="relative">
          <div className="h-96 text-center flex flex-col justify-center group-hover:scale-105 transition-transform">
            <h1 className="text-4xl font-bold">&quot;Hello World!&quot; 👋</h1>
            <Gap size={4} />
            <p className="text-lg">안녕하세요! 00하는 개발자 박건규입니다!</p>
          </div>
          <span className="font-semibold opacity-70 group-hover:opacity-100 transition absolute right-10 bottom-10 cursor-pointer">
            Read more &rarr;
          </span>
        </Link>
      </Container>
    </div>
  );
}
