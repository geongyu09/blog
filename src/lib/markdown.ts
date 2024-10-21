export interface Headers {
  text: string;
  level: 1 | 2 | 3 | number;
}
export function parseMarkdown(markdown: string) {
  const lines = markdown.split('\n');
  const headers: Headers[] = [];

  lines.forEach((line) => {
    if (line.startsWith('#')) {
      const level = line.split('#').length - 1;
      const text = line.split('# ')[1];
      if (level > 0) headers.push({ text, level });
    }
  });

  return headers;
}
