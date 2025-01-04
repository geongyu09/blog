import Link from 'next/link';

import Gap from '@/components/common/layout/Gap';
import Image from 'next/image';
import ROUTE_PATH from '@/constants/path/routePath';

export default function NotFound() {
  return (
    <section className="flex flex-col items-center select-none h-screen">
      <Gap size={5} />
      <Image
        src="/assets/404/codingCat.png"
        alt="404"
        width={900}
        height={300}
      />
      <Gap size={10} />
      <h2 className="text-4xl font-semibold">404 - Not Found</h2>
      <Gap size={1} />
      <p>
        찾고계신 페이지가 없습니다! 혹은 해당 페이지는 열심히 준비중이니 조금만
        기다려주세요 🙃
      </p>
      <Gap size={5} />

      <Link
        className="bg-indigo-500 text-white px-4 py-2 rounded-lg"
        href={ROUTE_PATH.HOME}
      >
        홈으로 가기
      </Link>
    </section>
  );
}
