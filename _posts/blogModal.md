---
title: '[블로그] 모달 관리에 관한 고민점들'
thumbnail: '/assets/blog/blogModal/image.png'
description: '모달 코드와 관련하여 조금 더 좋은 코드를 작성하는 방법에 대한 고민을 담았습니다'
date: '2024년 9월 23일'
tags: '블로그 일지 modal'
timeStamps : 1726790400
---

# 배너

기존에 기획하였던 홈 화면의 요구사항대로 나의 포트폴리오처럼 나에 대해 관심을 가지는 사람들에게 ‘나 이런사람이다’ 라고 소개할 수 있는 화면을 만들고자 하였다. 

홈 화면에서 무엇인가 소개하고, 알리고자 하는 바를 유저에게 잘 전달할 수 있는 UI는 바로 배너라고 생각하였다. 해당 요구사항을 만족할 수 있는 방법으로 배너를 선택하게 되었다. 

![image.png](/assets/blog/blogModal/image.png)

지금까지 만들어진 홈 화면을 보면 이와 같다. 

홈화면 윗쪽의 배너는 내 블로그에 들어왔을 때 바로 보이는 UI 이다. 방문자에게 조금이나마 친절한 인상을 주고자 이와 같은 문구를 넣게 되었다. 

다만 이는 위처럼 큰 화면을 차지함에도 별 다른 기능이나 큰 이팩트를 주지 못한다고 생각한다. 이는 물론 좋은 디자인을 추가하면 충분히 해당 효과를 볼 수 있을 것이지만, 나는 디자이너가 아니므로 다른 방향으로 해결하고자 하였다. 

## 포트폴리오 추가

어떤 기능을 추가할 수 있을까 고민을 하다가, 결국 나에 대해서 소개하는 요구사항을 충족하려면, 클릭했을 때 about 페이지 등으로 이동하여 소개글을 볼 수 있도록 하는 것이 좋아보였다. 

단순히 페이지 이동으로 구현하면 재미가 없고, 나에 대해서 소개를 하는 것은 블로그의 여러 기능들 중 하나일 뿐, 주된 기능은 내 글을 읽게 하는 것이므로, 홈 화면에서 바로 보이는 배너를 클릭해 소개 페이지로 이동시키는 것 보다는 홈에 머무르며 간단히 내 소개를 보여주고, 유저의 주된 관심사를 글을 읽는 부분으로 두고 싶었다. 

이를 위해 모달 기능이 가장 유용하겠다는 결론에 다달았다. 

모달에 간단한 내 pr을 할 수 있는 정보를 보여주도록 하였다. 

## 모달 관리

지금까지 모달을 생성할 때 createPortal을 사용하였다. 

모달을 띄우는 경우가 많이 있을 때, createPortal이 반복되게 되며, 이를 따로 컴포넌트로 만들어서, 관리할 수 있도록 하는 편이었다. 

```tsx
// createPortal 로직을 관리하는 컴포넌트

'use client';

import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps extends PropsWithChildren {
  key?: string;
  domNode?: HTMLElement;
}
export default function PortalCreator({
  children,
  domNode = document.body,
  key,
}: ModalProps) {
  return createPortal(children, domNode, key);
}

//이는 아래와 같이 사용할 수 있다. 

export default function HomeBannerSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative">
      <HomeBanner />
      {/* 버튼 클릭시 모달이 열린다. */}
      <button 
        type="button"
        className="w-full h-full absolute inset-0 bg-transparent"
        aria-label="Open Modal"
        onClick={handleClick}
      /> 
      {isOpen && (
        <PortalCreator>
          <section>
            <div>모달이 띄워짐</div>
          </section>
        </PortalCreator>
      )}
    </section>
  );
}
// }
```

다만 이는 정말 치명적인 단점이 존재한다. 

모달을 사용하는 곳마다 모달이 열려있는지에 대한 상태를 해당 컴포넌트에서 관리해야한다는 것이다. 이는 모달을 사용하는 모든 곳에서 올바른 방법으로 state를 정의해야 하며 이는 재사용성 및 확장성에 좋지 않다. 그리고 모달 상태 및 모달 컴포넌트에 대한 로직이 사용될 컴포넌트는 모달 로직에 관심이 있을까? 아닌 경우도 존재하겠지만 거희 모든 경우에 해당 모달에 관심이 있지는 않을 것이다. 이는 해당 트리 구조에서 열리는 것이 아닌 또 다른 트리에 속해있는 노드이다. 해당 컴포넌트에서 추가되는 것이 아닌, 화면에 띄워지는 것이므로 해당 로직이 기존 트리구조 로직에 존재하는 것은 유지보수적으로 좋지 않다고 생각한다. 

즉 정리하면 아래의 근본적인 문제점 때문이다. 

> “모달에 관련한 로직을 모달에 관심이 없는 컴포넌트가 알아야 한다.”
> 

이를 해결하는 올바른 방향성은 아래와 같을 것이다. 

- 모달에 관련된 로직은 한 곳에서 관리해야 한다.
- 모달과 기존 컴포넌트 트리들에서 사용할 수 있는 인터페이스를 제공해야한다.
- 어디서든 사용할 수 있어야 한다.

## 모달 상태 로직

가장 먼저 생각한 방법은 간단히 반복되는 비지니스로직을 훅으로 만들어 보면 어떨지 생각해보았다. 

```tsx
import { useState } from 'react';

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return { isOpen, openModal, closeModal };
}
```

사용하는 곳에서는 아래처럼 사용할 수 있다. 

```tsx
export default function HomeBannerSection() {
  const { isOpen, openModal } = useModal();

  return (
    <section className="relative">
      <HomeBanner />
      {/* 버튼 클릭시 모달이 열린다. */}
      <button 
        type="button"
        className="w-full h-full absolute inset-0 bg-transparent"
        aria-label="Open Modal"
        onClick={openModal}
      /> 
      {isOpen && (
        <PortalCreator>
          <section>
            <div>모달이 띄워짐</div>
          </section>
        </PortalCreator>
      )}
    </section>
  );
}
```

다만 이는 반복되는 state를 조금 더 formal 하게 선언해줄 뿐 사용하는 곳에서 isOpen에 대하여 모달을 띄우는 로직이 필요하다는 것은 변함이 없다. 그리고 사용하는 곳에서 또 동일하게 isOpen과 같은 상태를 알아야 한다는 것, 그리고 그상태에 따라서 동작 로직을 작성해야한다는 것은 문제가 있어 보였다. 

이를 해결하기 위해서 전역상태를 사용하면 어떨가 생각하였다. 

provider에서 isOpen과 같은 상태 및 내부 처리를 하게 되고, 모달을 사용하는 곳에서는 아무런 내부 구현 사항을 모른채 제공하는 value의 메서드만 사용하면 되지 않을까? 

## Modal library

### Context

```tsx
import { createContext } from 'react';
import { ModalContextValue } from '../types';

const ModalContext = createContext<ModalContextValue | null>(null);

export default ModalContext;
```

### Provider

provider의 경우 아래와 같이 모달을 띄우는 모든 로직을 가지고 있도록 하였다. 

```tsx
'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import PortalCreator from '@/components/common/lib/modal/PortalCreator';
import ModalContext from '../context/index';
import type { Modal, ModalContextValue, PushModal } from '../types';

interface ModalQueueItem {
  key: string;
  modal: Modal;
  onClose: () => void;
}

interface ModalProviderProps {
  children: React.ReactNode;
}

export default function ModalProvider({ children }: ModalProviderProps) {
  const [modalQueue, setModalQueue] = useState<ModalQueueItem[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // in modal state
  const [modalCloseResponse, setModalCloseResponse] = useState<
    boolean | string | null
  >(null);

  const currentModal = modalQueue[0];

  useEffect(() => {
    if (modalQueue.length > 0) {
      setIsOpen(true);
    }
  }, [modalQueue, setIsOpen]);

  const pushModal = useCallback(({ modal, onClose = () => {} }: PushModal) => {
    const key = Date.now().toString();

    const newModal: ModalQueueItem = {
      key,
      modal,
      onClose,
    };
    setModalQueue((prev) => [...prev, newModal]);
  }, []);

  /**
   * 모달의 리턴값을 설정하는 함수
   * 이는 모달 컴포넌트 내에서 사용할 수 있다.
   */
  const setResponse = useCallback((response: boolean | string) => {
    setModalCloseResponse(response);
  }, []);

  /**
   * 모달의 리턴값을 가져오는 함수
   * 이는 일반 컴포넌트에서 사용할 수 있다.
   */
  const getResponse = useCallback(() => {
    return modalCloseResponse;
  }, [modalCloseResponse]);

  /**
   * 모달을 닫는 함수
   * ModalQueue에서 첫번째 모달을 제거하고, isOpen을 false로 변경한다.
   */
  const closeModal = useCallback(() => {
    currentModal.onClose();
    setModalQueue((prev) => prev.slice(1));
    setIsOpen(false);
  }, [currentModal]);

  const value: ModalContextValue = useMemo(
    () => ({
      pushModal,
      setResponse,
      getResponse,
      closeModal,
    }),
    [pushModal, setResponse, getResponse, closeModal],
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      {isOpen && <PortalCreator>{modalQueue[0].modal}</PortalCreator>}
    </ModalContext.Provider>
  );
}

```

여기서 전역상태로 관리하게 된다면 여러 곳에서 모달을 띄우고자 할 때 이를 스케줄링 해줄 필요가 있다고 생각하였다. 

이에 따라서 전역으로 모달을 담아두는 큐를 만들고, FIFO정책으로 하나씩 띄워주는 방향으로 만들어보고자 하였다. 

큐의 경우 상태로서 정의를 해두었다. 

```tsx
const [modalQueue, setModalQueue] = useState<ModalQueueItem[]>([]);
```

다만, 현재 모달이 띄워진 상태인데, 계속해서 모달이 띄워지는 상황은 원지 않았다. 모달이 큐에 들어가 있다면, 하나 띄워지고, 이 모달이 내려가면 그 다음 모달이 보여지는 방향으로 구현하기 위해서는 현재 모달이 띄워진 상태인지를 확인할 수 있어야 했다. 

모달의 띄워져 있는지에 대한 상태를 아래와 같이 정의하였다. 

```tsx
const [isOpen, setIsOpen] = useState<boolean>(false);
```

그리고 모달이 띄워지고, 내려가는 로직을 아래와 같이 작성하였다. 

```tsx
//Queue에 모달이 하나라도 있다면, 열린 상태라고 생각한다.
  useEffect(() => {
    if (modalQueue.length > 0) {
      setIsOpen(true);
    }
  }, [modalQueue, setIsOpen]);
```

```tsx
  /**
   * 모달을 닫는 함수
   * ModalQueue에서 첫번째 모달을 제거하고, isOpen을 false로 변경한다.
   */
  const closeModal = useCallback(() => {
    currentModal.onClose();
    setModalQueue((prev) => prev.slice(1));
    setIsOpen(false);
  }, [currentModal]);
```

이 둘은 리액트의 동작에 따라 아래의 절차대로 동작한다.

- Queue에 모달 컴포넌트가 들어온다.
- Queue가 변경되어 useEffect가 실행된다. 이때 Queue에 값이 있으므로 열린 상태로 상태가 변경된다.
- 열린 상태로 변경되어 재랜더링이 되며, 0번째 모달이 띄워진다.
- 모달이 닫히면 닫힌 상태로 변경되며, 다음 모달을 띄운다.
    - 만약 1번째 모달이 없다면 초기 상태로 변경된다.

### useHooks

context의 value에 접근하기 위해서는 훅을 사용하도록 하였다. 

```tsx
'use client';

import { useContext } from 'react';
import ModalContext from '../context';

export default function useModal() {
  if (!ModalContext)
    throw new Error('useModal은 ModalProvider 내부에서만 사용할 수 있습니다.');

  const context = useContext(ModalContext);

  if (!context)
    throw new Error('useModal은 ModalProvider 내부에서만 사용할 수 있습니다.');

  return context;
}

```

이때 provider로 감싸지지 않은 곳에서 사용시에 에러를 띄우도록 하였다. 

### 모달과 기존의 트리와 정보 교환

여러 경우에 모달에서 생성된 데이터를 기존의 컴포넌트로 가져와야 하는 경우가 존재한다. 

띄워진 모달에 input이 존재하여, 이를 통해서 사용자의 입력을 받고, 받아온 입력을 통해서 기존의 컴포넌트 트리에서 새로운 ui를 보여주어야 할때가 이때 일 것이다. 

결국에 서로 다른 트리(실은 다르지 않지만, 공통 부모가 body인, 거희 남남인 컴포넌트 둘)의 컴포넌트의 정보 교환이 필요한 상태였다. 

이를 해결하기 위해서는 결국 context api 를 다시 한번 사용을 해야만 했다. 

그렇게 만들어진 것이 아래의 전체 로직이다.

```tsx
'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import PortalCreator from '@/components/common/lib/modal/PortalCreator';
import ModalContext from '../context/index';
import type { Modal, ModalContextValue, PushModal } from '../types';

interface ModalQueueItem {
  key: string;
  modal: Modal;
  onClose: () => void;
}

interface ModalProviderProps {
  children: React.ReactNode;
}

export default function ModalProvider({ children }: ModalProviderProps) {
  const [modalQueue, setModalQueue] = useState<ModalQueueItem[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // in modal state
  const [modalCloseResponse, setModalCloseResponse] = useState<
    boolean | string | null
  >(null);

  const currentModal = modalQueue[0];

  useEffect(() => {
    if (modalQueue.length > 0) {
      setIsOpen(true);
    }
  }, [modalQueue, setIsOpen]);

  const pushModal = useCallback(({ modal, onClose = () => {} }: PushModal) => {
    const key = Date.now().toString();

    const newModal: ModalQueueItem = {
      key,
      modal,
      onClose,
    };
    setModalQueue((prev) => [...prev, newModal]);
  }, []);

  /**
   * 모달의 리턴값을 설정하는 함수
   * 이는 모달 컴포넌트 내에서 사용할 수 있다.
   */
  const setResponse = useCallback((response: boolean | string) => {
    setModalCloseResponse(response);
  }, []);

  /**
   * 모달의 리턴값을 가져오는 함수
   * 이는 일반 컴포넌트에서 사용할 수 있다.
   */
  const getResponse = useCallback(() => {
    return modalCloseResponse;
  }, [modalCloseResponse]);

  /**
   * 모달을 닫는 함수
   * ModalQueue에서 첫번째 모달을 제거하고, isOpen을 false로 변경한다.
   */
  const closeModal = useCallback(() => {
    currentModal.onClose();
    setModalQueue((prev) => prev.slice(1));
    setIsOpen(false);
  }, [currentModal]);

  const value: ModalContextValue = useMemo(
    () => ({
      pushModal,
      setResponse,
      getResponse,
      closeModal,
    }),
    [pushModal, setResponse, getResponse, closeModal],
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      {isOpen && <PortalCreator>{modalQueue[0].modal}</PortalCreator>}
    </ModalContext.Provider>
  );
}

```

문제점은 모달의 내용을 어느 컴포넌트에서도 접근이 가능하며, 이를 계속 변경할 때마다 전체 트리의 모든 부분이 재 랜더링이 된다는 것이다. 

확실히 해당 부분에 대해서 문제점이 존재하고, 불필요한 렌더링을 막을 필요가 있다.