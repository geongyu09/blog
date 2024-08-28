interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  column: number;
  children: React.ReactNode | React.ReactNode[];
  gap: number;
}
export default function Grid({ children, column = 1, gap }: GridProps) {
  const columnClass = `grid-cols-${column} gap-${gap}`;
  return <div className={`grid w-full ${columnClass}`}>{children}</div>;
}
