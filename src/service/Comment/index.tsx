'use client';

import Giscus from '@giscus/react';

export default function Comment() {
  return (
    <Giscus
      id="comments"
      repo="geongyu09/geongyu09.github.io"
      repoId="R_kgDOMe-jUQ"
      category="Comments"
      categoryId="DIC_kwDOMe-jUc4CmpE_"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="light"
      lang="ko"
      loading="lazy"
    />
  );
}
