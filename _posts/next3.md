---
title: Next.js의 렌더링
date: '2024-03-16T05:35:07.322Z'
description: '짧지 않은 설명'
thumbnail: '/assets/blog/test/testThumb.jpg'
tags: 'next.js coding concept'
timeStamps: 1710566107
---

이전에는 페이지 단위로 렌더링 방식을 정했었다. 기존의 경우 빌드한 html파일을 보내고, js를 보내서 hydrated를 실현했다. 다만 이 경우 어플리케이션 규모가 커질수록 js번들링 사이즈가 커지는 문제점이 있었다.

리엑트 18이 릴리즈 되면서 서버 컴포넌트와 클라이언트 컴포넌트가 나오게 되었다. 이로 인하여 next는 컴포넌트 단위로 렌더링을 하도록 발전하게 되었다.

# Server Components

기본적으로 next의 app에서 만든 컴포넌트들은 기본적으로는 서버 컴포넌트이다. 실제로 console.log()를 실행해보면 클라이언트가 아닌 로컬의 콘솔에 찍히는 것을 볼 수 있다. 브라우저에는 찍히지 않는다.

- 서버 컴포넌트는 서버에서 실행된다.
- 그러다 보니 렌더링 시에 html로 만들기 때문에 클라이언트 상에는 동작하지 않는다.
- 그러다보니 클라이언트 환경에서 지원되는 api를 사용하지 못한다(상태 기억(state), 이벤트 처리, Localhost등에 메모리 저장(localStorage) 등). 반대로 node에서 지원하는 api를 사용할 수 있다.(파일 입출력 등)

```tsx
import Image from 'next/image';
import os from 'os'; //노드 APIs

export default function Home() {
  console.log(os.hostname()); //baggeongyuui-MacBookPro.local
  return <h1>홈페이지 :)</h1>;
}
```

app폴더 안에 있게 되면 무조건 서버에서 실행되게 된다. 나중에 fetching데이터를 받아와서 SSR을 하더라도 데이터 받은 이후 **서버에서 렌더링 후** html로 보내주게 된다.

# Client Components

app에서 만든 모든 컴포넌트는 서버 컴포넌트였다. 클라이언트 컴포넌트를 사용하기 위해 알아야할 주의할 점은, 필요한 것들만 컴포넌트로 만들어야 한다는 것이다. 페이지 전체를 클라이언트상에서 컴포넌트를 만들도록(CSR과 유사하지만 다른)할 수는 있지만, 그러면 next를 사용하는 이유가 없어진다. 정말 클라이언트에서 제공하는 것을 이용해야 하는 아주 작은 부분만 클라이언트 컴포넌트로 만들어야 한다. (리엑트의 기본 원칙이기도 했다. 재사용 가능한 컴포넌트를 따로 빼서 만듦.)(전체적으로 서버에서 만들도록*장점*다만 필요한 부분에 한하여 클라이언트에서 렌더링 되도록)

구현하는 방법은 파일 상단에 `‘useClient’;` 를 넣어주는 것이다. 이렇게 만든 클라이언트 컴포넌트는 components폴더를 만들어 넣어주면 된다. 되도록이면 app밖에, src내에 만드는 것을 추천한다. app에는 페이지 파일만 들어가도록 만들어 주자.

```tsx
'use client';
import React, { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount((prev) => ++prev)}> + </button>
    </div>
  );
}
```

### 동작원리

각 파일에 log를 넣어서 build하게되면 클라이언트 컴포넌트 든 서버 컴포넌트이든 모두 실행되는 것을 볼 수 있다. 그리고 브라우저에서 받아오는 파일을 분석해보면 클라이언트 컴포넌트의 내용까지 html로 변환되어 나온 것을 볼 수 있다. 즉 빌드를 하게 되면, 클라이언트든 서버든 모든 컴포넌트를 실행해보면서 바로 사용자에게 의미있는 페이지를 보여줄 수 있도록 정적으로 렌더링 하게 되고, 이후에 리엑트 코드를 보내줘서 hydration하게 되어 동작하게 된다. (실제로 처음 받은 html파일을 열어보면 컴포넌트가 동작하지 않는 것을 볼 수 있다. ) 어? 그럼 이것을 CSR이라고 말할 수 있는건가? 싶기도 하다. hydration되게 되면 실제로 컴포넌트로 렌더링 되게 된다. 물론 클라이언트상에서 렌더링이 되지만, 모든 것이 CSR이 되는 것은 아니다.(일부분은 서버에서 만들어져서 보내짐)

### 내용 정리

지금까지 나온 내용을 간단히 정리해보자. 먼저 렌더링에는 환경에 따라 서버 사이드 렌더링, 클라이언트 사이드 렌더링. 두가지가 있다. 또한 서버에서는 동적 렌더링, 정적 렌더링이 존재한다. 동적 렌더링(SSR)은 말 그대로 동적으로 요청이 들어올 때마다 렌더링 해서 보여주는 것이다. 정적 렌더링(SSG, ISR)은 preRendering을 통해 빌스 타임때 미리 html을 만들어 두어 보내준다.

특히 정적 렌더링의 경우 동작하는 환경에 따라 서버와 클라이언트로 나눌 수 있다. 서버 정적 렌더링의 경우 빌드시 리엑트를 동작시켜서 페이지를 로드해 html로 만들어 준다. 이는 클라이언트에서 동작할 필요가 없으므로(동작해봤자 js파일 받아와서 hydrated해주어서 컴포넌트화 하는건데, 그건 미리 서버에서 다 해서 html로 만든것이니 중복동작이 된다.) html만 보내주면 된다.

정적 클라이언트 렌더링의 경우 html과 JSON을 사전 렌더링 후 서버에 캐싱하게 된다. 이후 요청이 보내지면 그때 캐싱데이터를 보내주게 된다. 이는 대체로 동작하는 코드가 존재하므로 js코드를 보내서 클라이언트에서 hydrated된다. 이후에는 state와 같은 기능이 동작하게 된다. 꼭 CSR이 아니라는 것이다.

(동적 라우팅에서 getStateParams()를 이용해 미리 페이지를 만들어 놓은 것이 이에 속한다.)

> 동작을 빠르게 만들 수 있었던 이유
> 일단 기본적으로 서버에서 동작하는 렌더링의 경우 모두 preRendering을 진행하여 미리 html화 한다. 이를 통해 가벼운 html파일만 먼저 받으니 TTV에도 좋으며, hydrated가 필요 없는 컴포넌트의 경우 굳이 코드를 주지 않으니 hydrated를 기다릴 필요도 없이 볼 수 있고, 부분적으로 필요한 컴포넌트의 경우에만 js코드를 보내주어 번들 사이즈 감소 효과와 좋은 성능을 기대할 수 있다.

추가적으로 page 로직들만 app에 두고, 비지니스 로직을 service나 apis로 디렉토리를 만들어서 한 곳에 모아두는 것을 추천한다.

# SSG

기본적인 SSG를 구현해보자. 간단히 서버 사이드 정적 렌더링이 이에 속한다. 동적 라우팅을 하더라도 이 값을 `generateStaticParams()` 를 이용해서 미리 렌더링 되도록 SSG를 구현할 수 있었다.

기본적인 파일은 아래와 같이 만들 것이다.

- 기본 파일 보기 (앞으로 렌더링 방식에 따라 살을 붙여나감)

  ```tsx
  //src/service/product.ts
  //api 파일
  import path from 'path';
  import { promises as fs } from 'fs';

  export type Product = {
    id: string;
    name: string;
    price: number;
  };

  //항상 async함수는 프로미스 함수가 되니까 반환타입은 Promise<>이다.
  export async function getProducts(): Promise<Product[]> {
    //node 파일 읽어오기
    const filePath = path.join(process.cwd(), 'src', 'data', 'products.json');
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  }

  //만약 데이터를 가져오는 상황이라면 값이 있을 수도 없을수도 있으니 아래처럼 타입을 정의한다.
  //결국 프로미스 함수이고, 그 벨류값을 제네릭에 넣는 것이므로.
  export async function getProduct(id: string): Promise<Product | undefined> {
    const products = await getProducts();
    return products.find((item) => item.id === id);
  }
  ```

  ```tsx
  //app/products/page.tsx

  import { getProducts } from '@/service/products';
  import { Metadata } from 'next';
  import Link from 'next/link';
  import React from 'react';

  export const metadata: Metadata = {
    title: '멋진 제품 사이트 | 전체 제품',
    description: '멋진 제품을 확인해보세요.',
  };

  export default async function ProductsPage() {
    const products = await getProducts();
    return (
      <ul>
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <li>{product.name}</li>
          </Link>
        ))}
      </ul>
    );
  }
  ```

  ```tsx
  import { getProduct, getProducts } from '@/service/products';
  import React from 'react';

  type Props = {
    params: {
      slug: string;
    };
  };

  export function generateMetadata({ params: { slug } }: Props) {
    return {
      title: `제품의 이름 : ${slug}`,
    };
  }

  export default async function ProductPage({ params: { slug } }: Props) {
    const product = await getProduct(slug);
    if (product) return <div>대충 {product.name} 설명하는 글</div>;
  }

  export async function generateStaticParams() {
    const products = await getProducts();
    return products.map((product) => {
      return {
        slug: product.id,
      };
    });
  }
  ```

- 기본 node api

  - path
    - `process.cwd()` : 현재 위치를 string으로 반환하여 준다.
    - `.join()` : string타입의 인자를 여러 개 받아 하나의 url로 반환하여 준다.
  - fs

    - 파일 가져오기

    ```tsx
    import { promises as fs } from 'fs';

    const data = await fs.readFile(filePath, 'utf-8');
    ```

- Ts 타입 관련
  async 함수는 무조건 promise함수가 된다. 어떠한 타입을 반환하더라도 프로미스객체의 value에 담겨 반환하게 된다. (이로 인하여 반환값을 받을 때 then()을 사용하는 것은 기본) 그러다보니 무조건 반환타입은 `Promise<value type>` 이다.
  추가적으로 객체를 반환할 때는 무조건 타입을 설정해주자.

컴포넌트는 서버 사이드 한정으로 비동기적으로 작성 가능하다.

# ISR

위의 코드가 실행된(dev) 상태에서 data파일의 데이터를 바꾸어도 화면상에 바뀌는 것이 아무것도 없다(리프레쉬를 해도 안바뀜). 빌드시에 html파일을 만들어 두고 이를 계속 보내주는 것만 하니 당연하다.

(물론 컴포넌트가 변경되면 html을 다시 만들어 주므로 리프레시 하면 변경사항이 적용된다. )

(dev모드는 SSR처럼 동작하긴 한다. 다만 컴포넌트 한에서만)

ISR로서 revalidate를 하도록 만들려면 해당 라우트의 page 또는 layout파일에 `export const revalidate = 00`를 넣어주면 된다.

```tsx
//products/page.tsx
import { getProducts } from '@/service/products';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const revalidate = 10;

export const metadata: Metadata = {
  title: '멋진 제품 사이트 | 전체 제품',
  description: '멋진 제품을 확인해보세요.',
};

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <ul>
      {products.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`}>
          <li>{product.name}</li>
        </Link>
      ))}
    </ul>
  );
}
```

주의할 점은 dev모드에서는 컴포넌트 변경만 잡지 데이터 변경을 잡지 않는다. ssr이긴한데.. 에매한 아이다.

이렇게 static상황에서 데이터 변경과 컴포넌트가 아닌 다른 코드의 변경사항의 경우, 빌드(npm run build)후 실행(npm start)해주면 된다.

# SSR

SSR을 사용하는 곳은 자주 데이터가 변경되고, 이 데이터를 즉각적으로 보여줘야 할 때이다. 값을 가져오는 fetch에서 이를 설정해줄 수 있다.

## fetch()

원래 fetch는 브라우저에서 지원하는 api이지만, next환경에서 리엑트가 18로 업그레이드 되면서 서버컴포넌트 개념이 생기며 지원하게 되었다. 데이터를 받아올 때 fetch를 사용하는데, 옵션으로 next, cache값을 줄 수 있다.

- `next : {revalidate : number}` : 해당 fetch를 n초마다 re-fetch하며, 결과 반환 후 re-rendering하게 된다. 즉 ISR을 구현할 수 있다. 0이라면 SSR로 동작하게 된다.(리프레시마다(요청할 때마다) 값이 바뀐다.) 값을 주지 않으면 SSG가 된다.
- `cache : number` : 캐시 데이터를 얼마나 가지고 있을지에 대한 값으로 캐시가 사라지면 그 때마다 refetch가 일어난다.
  - force-cache(default) : 영원히 캐시를 가지고 있는다. revalidate값을 주지 않는 것과 동일(SSG)
  - no-store : 캐시를 저장하지 않음. revalidate : 0과 동일하다. (SSR)

```tsx
export default async function ProductsPage() {
  const products = await getProducts();
  const res = await fetch("https://meowfacts.herokuapp.com",
  // {
  //   next: {
  //     revalidate: 1,
  //   },
  //   cache: "no-store"
  // });
  const data = await res.json();
  const factText = data.data[0];
  return (
    <>
    </>
  );
}
```

fetch의 경우 서버 컴포넌트에서 사용하는 것을 추천한다고 한다.

- 백엔드데이터 리소스를 즉각적으로 접근 가능하다.
- 보안에 민감한 토큰이나 클라이언트 키 등을 알려주지 않아도 된다.
- 데이터 fetch와 렌더링을 같은 환경에서 할 수 있다.
- 번거로운 과정이 사라진다.(js보내고, fetch하고, 데이터 가져와서, 다시 렌더링 하고)

추가적으로 네트워크 상태 라이브러리의 경우 fetch말고 다양한 라이브러리를 사용해도 된다.

# CSR

csr을 구현하려면 이전해 했듯이 ‘use client’를 사용하면 된다. 주의할 점은 최소한의 컴포넌트만 CSR로 동작하도록 만들어야 한다. 추가적으로 클라이언트 컴포넌트의 경우 async로 만들어도 되긴 하는데 경고가 뜬다.

```tsx
//service/MeowArtivle.tsx
'use client';

import React, { useEffect, useState } from 'react';

export default function MeowArticle() {
  const [text, setText] = useState('데이터 준비중...');
  useEffect(() => {
    fetch('https://meowfacts.herokuapp.com')
      .then((res) => res.json())
      .then((data) => setText(data.data[0]));
  }, []);
  return <article>{text}</article>;
}
```

```tsx
import MeowArticle from '@/service/MeowArticle';
import React from 'react';

export default async function ProductsPage() {
  return (
    <>
      <MeowArticle />
    </>
  );
}
```

### 추가

기본적으로 데이터 요청은 병렬적으로 진행된다. 이로 인하여 성능 향상을 기대할 수 있다.

POST요청을 제외하고 모든 요청은 중복되어도 1회만 한다.

# api/route.ts

https://nextjs.org/docs/app/api-reference/file-conventions/route

기본적으로 서버리스라는 개념을 알아야 한다. 개발자가 서버를 만들고 관리하기가 너무 피곤한 일이다. 이를 이해햐여 netflify나 vercel과 같은 회사에 파일을 빌드하면, 정확히 말하면 서버 요청api를 만들고 이를 회사 서버에 입력해주면 알아서 그 페이지의 요청이 오면 서버의 동작을 해주고 함수를 실행하도록 하는 서버리스라는 서비스가 나왔다.

(리엑트에서 fetch하며 데이터 요청하던 것들 모두 프론트단에서 가능하던 것들이다. 서버의 경우 request, response를 관리하는 것이다. 특정 request가 오면 맞는 request를 주는 것. 리엑트에서 하던 것들은 모두 서버에 request하는 것 뿐이다.)

next에서는 풀스텍을 지원하는데, 이를 지원할 수 있는 이유는 이렇게 서버의 api를 짤 수 있기 때문이다.

기본적으로 api를 만드려면 `/api/[원하는 주소]` 주소로 요청이 되어야 한다. 즉 v12라면 pages/api/index.ts 등과 같이 라우팅을 만들면 되고, v13이라면 app/api/route.ts 로 만들면된다. 파일 이름은 route.ts이다.

올바르게 라우팅 되도록 만들어 주고, 이 안에서 서버에서 동작하는 api를 만들어 줄 수 있다.

```tsx
export async function GET(request: Request) {}

export async function HEAD(request: Request) {}

export async function POST(request: Request) {}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {}
```

이처럼 함수로서 해안 status로 반응하게 만들면 된다.

```tsx
//app/api/products/route.ts
import { getProducts } from '@/service/products';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const product = await getProducts();
  return NextResponse.json({ product });
}
```

타입을 잘 보자!

NextResponse는 https://nextjs.org/docs/app/api-reference/functions/next-response 에 설명되어있다.

모든 request에 대하여 response를 반환하여 주어야 한다. 반응(response)는 Respnse의 인스턴스를 반환하여 주어야 한다.

body를 받고자 한다면 `const body = *await* req.json();` 를 통해 받을 수 있다.

### Response()

반응에 관련한 객체 생성자이다. 반응하고자 하는 method함수(GET(), POST()등등과 같은 위에 적인 코드)에 이 생성자로 만들어진 인스턴스를 반환하여야 한다.

```tsx
return new Response([body], [{headers, status statusText}])
```

**body의 경우** string타입만 받으므로 `JSON.stringigy()`를 사용하자! 대체로 객체로 담아서(정확히는 JSON형태로 담아서) 사용하는 것이 좋다. 이후 옵션들은 status정도는 성공 여부에 따라 올바르게 반환하여 주는 것이 좋다.

### NextResponse

next에서 제공하는 조금 더 많은 기능을 추가한 Response()생성자이다. 보면 쿠키와 관련한 작업들이 추가되었다. 필요시에 사용하면 된다.

리턴시에는 아래와 같이 .json을 붙여서 사용하면 된다 .

```tsx
return NextResponse.json(
      { message: "유효하지 않는 포멧" },
      {
        status: 500,
      }
```
