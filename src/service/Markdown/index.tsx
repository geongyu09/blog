import { PropsWithChildren } from 'react';
import remarkGfm from 'remark-gfm';
import Markdown from 'react-markdown';
import './style.css';

interface MarkdownProps extends PropsWithChildren<{}> {
  children: string;
}
export default function MakrdownVidwer({ children }: MarkdownProps) {
  return (
    <Markdown className="typhography" remarkPlugins={[remarkGfm]}>
      {children}
    </Markdown>
  );
}
