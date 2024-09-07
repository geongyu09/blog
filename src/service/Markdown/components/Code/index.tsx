import SyntaxHighlighter from 'react-syntax-highlighter';
import { atelierForestLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function Code(props: any) {
  const { children, className, ...rest } = props;
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
