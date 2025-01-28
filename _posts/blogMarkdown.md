---
title: '[블로그] 블로그 마크다운'
date: '2024년 9월 8일'
description: '블로그를 만들면서 고민했던 내용들 중, 마크다운과 관련한 트러블 슈팅 내용이 담겨있습니다'
thumbnail: '/assets/blog/blogMarkdown/image.png'
tags: 'blog markdown react-markdown'
timeStamps: 1725408000
---

# 글 보여주기_detail 페이지

역시나 블로그글은 노션과 비슷하게 마크다운 문법으로 작성하는 것이 좋아보였다. 이를 보여주기 위해서는 여러가지 과정이 필요했다. 

## 메타데이터 관리하기_gray-matter

일단 정적인 웹페이지를 만들기로 하였기 때문에 모든 포스트는 파일 형태로 존재하게 된다. 그리고 이 파일의 메타데이터를 가져올 수 있어야 하며, 이를 통해서 여러 정보를 화면상에 보여주어야 한다. 

여기서 나는 gray-matter를 사용하게 되었다. 

[npm: gray-matter](https://www.npmjs.com/package/gray-matter)

gray-matter는 파일 상단에 있는 정보를 가져와 파싱하는 역할을 한다. 가령 아래와 같은 파일이 있다면, 

```
---
title: Hello
slug: home
---
<h1>Hello world!</h1>
```

상단의 `---` 로 둘러쌓인 부분을 객체로 파싱해준다. 파싱된 결과는 아래와 같다. 


```
{
  content: '<h1>Hello world!</h1>',
  data: {
    title: 'Hello',
    slug: 'home'
  }
}
```


이를 이용하여 간단하게 포스트 파일의 내용을 가져오는 함수를 만들 수 있었다. 

```tsx
import { Post } from '@/types/post';
import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

const postsDirectory = join(process.cwd(), '_posts');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return { data, slug: realSlug, content } as Post;
}

/**
 * @description 모든 포스트를 반환합니다.
 * @returns Post[]
 */
export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) => (post1.data.date > post2.data.date ? -1 : 1));
  return posts;
}

```

포스트 하나를 가져오는 함수와, 전체 포스트를 가져오는 함수를 만들게 되었다. 

이를 통해서 홈 화면과 디테일 화면에 포스트의 정보를 보여줄 수 있게 되었다. 

![image.png](/assets/blog/blogMarkdown/image.png)

## 포스트의 글 보여주기_react-markdown

결국 포스트 글을 마크다운 형태로 작성하고자 하였고, 이를 실제 html로 변경해주는 로직이 필요했다. 이를 해결하기 위해 react-markdown 라이브러리를 사용하게 되었다. 

[https://github.com/remarkjs/react-markdown](https://github.com/remarkjs/react-markdown)

간단히 마크다운 형태의 string을 넣어주면, 이를 html로 렌더링해준다. 

```
import React from 'react'
import {createRoot} from 'react-dom/client'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const markdown = `Just a link: www.nasa.gov.`

createRoot(document.body).render(
  <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
)
```

정말 간단한 사용법에 굳이 viewer를 만들지 않고 라이브러리를 사용하기로 하였다. 

### 라이브러리는 따로 관리하자!

항상 타 라이브러리는 따로 관리하는 것이 좋다고 생각한다. 해당 라이브러리를 따로 관리하지 않게 되면 내가 작성한 로직들이 라이브러리와 하나가 되어, 라이브러리가 업데이트 되거나 변경사항이 발생한 경우, 이를 수정하기가 쉽지 않게 된다. 해당 라이브러리를 사용한 모든 곳을 뒤져보아야 하며, 하나씩 변경해주어야 한다. 당연히 그만큼 많은 디버깅 비용과 휴먼 에러 발생 확률이 높아진다. 혹시나 문제가 생겨 다른 라이브러리로 변경해야한다면? 이 또한 동일하게 문제가 될 것이다. 

이러한 문제를 감안하여 이번에도 해당 라이브러리를 바로 사용하는 것이 아니라 따로 추상화를 해두어 내 로직과의 연결점을 한 곳으로 축소 하였다. 

```tsx
// service/Markdown/index.tsx

import remarkGfm from 'remark-gfm';
import Markdown from 'react-markdown';

interface MarkdownProps {
  markdown: string;
}
export default function MarkdownViewer({ markdown }: MarkdownProps) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      {markdown}
    </Markdown>
  );
}

```

사용하는 곳에서는 아래와 같이 사용하면 된다. 

```tsx
import MarkdownViewer from '@/service/Markdown';

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
	    {/* 생략... */}
      <MarkdownViewer markdown={content} />
    </Container>
  );
}
```

### 문제 상황

기본적으로 `<Markdown/>` 을 사용하면 기본적으로 style이 입혀진 상태가 된다고 한다. 하지만, 올바르게 스타일링이 되지 않았다.

![image.png](/assets/blog/blogMarkdown/image1.png)

[Problem with Tailwind CSS when using the react-markdown component](https://stackoverflow.com/questions/75706164/problem-with-tailwind-css-when-using-the-react-markdown-component)

나 뿐만 아니라 많은 사람들이 이와 비슷한 일을 겪었다. 이 문제상황의 이유는 tailwind에서 모든 스타일을 reset 시키기 때문이다. 

### 해결과정 1

스타일링만 문제가 되기 때문에 스타일을 주는 방식으로 해결하고자 하였다. 

```css
.typhography h1 {
  @apply text-3xl font-bold mt-12 mb-8;
}

.typhography h2 {
  @apply text-2xl font-bold mt-12 mb-8;
}

.typhography h3 {
  @apply text-xl font-bold mt-12 mb-8;
}

.typhography h4 {
  @apply text-lg font-bold mt-12 mb-8;
}
.typhography p {
  @apply text-lg my-4 leading-relaxed;
}

.typhography ul {
  @apply list-disc my-4 pl-8;
}

/* 생략... */
```

우선 마크다운만을 위한 css 파일을 만들어주었다. 여기서 @apply 를 사용하여서 tailwind를 동일하게 사용하도록 하여 통일감을 주고자 하였다. 

이를 아래와 같이 클래스명을 주어 적용할 수 있었다.

```tsx
import remarkGfm from 'remark-gfm';
import Markdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atelierForestLight } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import './style.css';

interface MarkdownProps {
  markdown: string;
}
export default function MarkdownViewer({ markdown }: MarkdownProps) {
  return (
    <Markdown
      className="typhography"
      remarkPlugins={[remarkGfm]}
    >
      {markdown}
    </Markdown>
  );
}

```

![image.png](/assets/blog/blogMarkdown/image2.png)

스타일을 마음대로 작성할 수 있다는 점에서 오히려 긍정적인 상황이라고 생각하였다. 

### 해결과정 2

조금 더 react-markdown 깃허브 설명을 보니 특정 매칭된 요소마다 다르게 렌더링을 시켜줄 수 있는 props가 존재한다는 것을 알게 되었다. 

[GitHub - remarkjs/react-markdown: Markdown component for React](https://github.com/remarkjs/react-markdown?tab=readme-ov-file#use-custom-components-syntax-highlight)

```tsx
import React from 'react'
import {createRoot} from 'react-dom/client'
import Markdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'

// Did you know you can use tildes instead of backticks for code in markdown? ✨
const markdown = `Here is some JavaScript code:

~~~js
console.log('It works!')
~~~
`

createRoot(document.body).render(
  <Markdown
    children={markdown}
    components={{
      code(props) {
        const {children, className, node, ...rest} = props
        const match = /language-(\w+)/.exec(className || '')
        return match ? (
          <SyntaxHighlighter
            {...rest}
            PreTag="div"
            children={String(children).replace(/\n$/, '')}
            language={match[1]}
            style={dark}
          />
        ) : (
          <code {...rest} className={className}>
            {children}
          </code>
        )
      }
    }}
  />
)
```

이를 바탕으로 각 요소들마다 기능을 가진 컴포넌트를 만들 수 있겠다는 것을 깨닫고, 기존에 css 파일로 스타일링을 하던 부분을 컴포넌트로 만들어서 추가하게 되었다. 

가령 아래와 같이 h1 태그마다 id 값을 주어 해당 위치로 바로 이동할 수 있도록 하는 기능을 넣는다면 아래와 같이 사용할 수 있다. 

```tsx
'use client';

import React from 'react';
import cn from '@/utils/cn';
import headerUtil from '@/utils/contentHeader';
import Link from 'next/link';

interface H1Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function H1({
  children,
  className = '',
  ...rest
}: H1Props): JSX.Element {
  const headerId = headerUtil.getHeaderHashText(children as string);
  return (
    <Link href={`#${headerId}`}>
      <h1
        id={headerId}
        className={cn(
          'text-3xl font-bold mt-12 mb-8',
          'hover:opacity-80 hover:',
          className,
        )}
        {...rest}
      >
        {children}
      </h1>
    </Link>
  );
}

H1.defaultProps = {
  children: null,
  className: '',
};
```