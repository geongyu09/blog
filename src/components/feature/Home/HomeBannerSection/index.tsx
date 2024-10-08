'use client';

import Container from '@/components/common/layout/Container';
import Gap from '@/components/common/layout/Gap';
import useModal from '@/lib/modal/hooks/useModal';
import { useState } from 'react';

function HomeBanner() {
  const { getResponse } = useModal();
  console.log(getResponse());

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

function TestModal() {
  // 모달에서도 onClose를 설정할 수 있어야 한다..?
  const { closeModal, setResponse, getResponse } = useModal();

  const [text, setText] = useState<string>(getResponse() as string);

  return (
    <div className="fixed bottom-0 right-0 w-screen h-screen z-50 ">
      <div className="fixed  bottom-0 w-full h-[95%] max-h-[95%]  bg-white flex flex-col items-center justify-center border">
        <h1 className="text-4xl font-bold">Test Modal</h1>
        <Gap size={4} />
        <p className="text-lg">모달 테스트입니다.</p>
        <Gap size={4} />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setResponse(text);
            closeModal(() => {
              alert('submit');
            });
          }}
        >
          <input
            type="text"
            className="border"
            onChange={(e) => setText(e.target.value)}
          />
        </form>
        <button
          type="button"
          onClick={() => {
            setResponse('close');
            closeModal();
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function HomeBannerSection() {
  const { pushModal, getResponse } = useModal();

  const handleClick = () => {
    pushModal({
      modal: <TestModal />,
      onClose: () => {
        alert(getResponse());
      },
    });
  };

  return (
    <section className="relative">
      <button onClick={handleClick} type="button" className="w-full">
        <HomeBanner />
      </button>
    </section>
  );
}
