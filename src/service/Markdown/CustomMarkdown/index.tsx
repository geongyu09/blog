interface CustomMarkdownProps {
  children: string;
}
export default function CustomMarkdown({ children }: CustomMarkdownProps) {
  function parseMarkdown(markdown: string): string {
    const lines = markdown.split('\n');
    let html = '';
    let inCodeBlock = false;
    let inList = false;

    for (const line of lines) {
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          html += '</code></pre>';
        } else {
          html += '<pre><code>';
        }
        inCodeBlock = !inCodeBlock;
        continue;
      }

      if (inCodeBlock) {
        html += `${line}\n`;
        continue;
      }

      if (line.trim().startsWith('#')) {
        const level = line.trim().split(' ')[0].length;
        const text = line.trim().substring(level).trim();
        html += `<h${level}>${text}</h${level}>`;
      } else if (line.trim().startsWith('- ')) {
        if (!inList) {
          html += '<ul>';
          inList = true;
        }
        html += `<li>${line.trim().substring(2)}</li>`;
      } else if (line.trim() === '') {
        if (inList) {
          html += '</ul>';
          inList = false;
        }
        html += '<br>';
      } else {
        html += `<p>${line}</p>`;
      }
    }

    if (inList) {
      html += '</ul>';
    }

    return html;
  }
  return <div>{children}</div>;
}
