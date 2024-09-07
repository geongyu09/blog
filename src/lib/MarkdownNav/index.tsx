import Link from 'next/link';
import { parseMarkdown } from '../markdown';

interface MarkdownNavProps {
  markdown: string;
}
export default function MarkdownNav({ markdown }: MarkdownNavProps) {
  const headers = parseMarkdown(markdown);

  return (
    <div className="border">
      {headers.map(({ text, level }, index) => (
        <Link key={`${text}-${level}-${index * 2}`} href={`#${text}`}>
          <p>{text}</p>
        </Link>
      ))}
    </div>
  );
}
