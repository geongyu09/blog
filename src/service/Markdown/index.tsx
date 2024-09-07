import remarkGfm from 'remark-gfm';
import Markdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atelierForestLight } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import './style.css';

function code(props: any) {
  const { children, className, node, ...rest } = props;
  const match = /language-(\w+)/.exec(className || '');
  return match ? (
    <SyntaxHighlighter
      {...rest}
      PreTag="div"
      language={match[1]}
      style={atelierForestLight}
    >
      {children}
    </SyntaxHighlighter>
  ) : (
    <code {...rest} className={className}>
      {children}
    </code>
  );
}

interface MarkdownProps {
  markdown: string;
}
export default function MarkdownViewer({ markdown }: MarkdownProps) {
  return (
    <Markdown
      className="typhography"
      remarkPlugins={[remarkGfm]}
      components={{
        code,
      }}
    >
      {markdown}
    </Markdown>
  );
}
