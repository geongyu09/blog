import remarkGfm from 'remark-gfm';
import Markdown from 'react-markdown';
import {
  H1,
  H2,
  H3,
  A,
  Blockquote,
  Code,
  EM,
  HR,
  Img,
  LI,
  OL,
  P,
  Pre,
  TD,
  TH,
  Table,
  UL,
} from './components';
import './style.css';

interface MarkdownProps {
  markdown: string;
}
export default function MarkdownViewer({ markdown }: MarkdownProps) {
  return (
    <Markdown
      className="typhography"
      remarkPlugins={[remarkGfm]}
      components={{
        code: Code,
        h1: H1,
        h2: H2,
        h3: H3,
        p: P,
        ul: UL,
        ol: OL,
        li: LI,
        a: A,
        img: Img,
        table: Table,
        th: TH,
        td: TD,
        pre: Pre,
        hr: HR,
        em: EM,
        blockquote: Blockquote as any,
      }}
    >
      {markdown}
    </Markdown>
  );
}
