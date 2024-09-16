'use client';

import Container from '@/components/common/layout/Container';
import Gap from '@/components/common/layout/Gap';
import useModal from '@/hooks/useModal';
import PortalCreator from '@/components/common/lib/modal/PortalCreator';

function HomeBanner() {
  return (
    <div className="bg-[#f1f1f1] group select-none relative">
      <Container>
        {/* <Link href="/portfolio" className="relative"> */}
        <div className="h-96 text-center flex flex-col justify-center group-hover:scale-105 transition-transform">
          <h1 className="text-4xl font-bold">&quot;Hello World!&quot; 👋</h1>
          <Gap size={4} />
          <p className="text-lg">안녕하세요! 00하는 개발자 박건규입니다!</p>
        </div>
        <span className="font-semibold opacity-70 group-hover:opacity-100 transition absolute right-10 bottom-10 cursor-pointer">
          Read more &rarr;
        </span>
        {/* </Link> */}
      </Container>
    </div>
  );
}

export default function HomeBannerSection() {
  const { openModal, closeModal, isOpen } = useModal();

  return (
    <section className="relative">
      <HomeBanner />
      <button
        type="button"
        className="w-full h-full absolute inset-0"
        onClick={openModal}
        aria-label="Open Modal"
      />
      {isOpen && (
        <PortalCreator>
          <section className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-all w-full h-full">
            <div className=""></div>
          </section>
        </PortalCreator>
      )}
    </section>
  );
}
