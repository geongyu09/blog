import { parseMarkdown } from '@/lib/markdown';
import { H1Content, H2Content, H3Content } from '../../sideContentTable';

interface ShortTableOfContentProps {
  content: string;
}
export default function ShortTableOfContent({
  content,
}: ShortTableOfContentProps) {
  const headers = parseMarkdown(content);
  return (
    <div className="px-2 flex flex-col gap-1 items-end">
      {headers.map(({ text, level }, index) => (
        <div key={`${index * 2}-${level}-${text}`}>
          {
            {
              1: <H1Content />,
              2: <H2Content />,
              3: <H3Content />,
            }[level]
          }
        </div>
      ))}
    </div>
  );
}
