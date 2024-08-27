import { PropsWithChildren } from 'react';

interface SplitLayoutProps extends PropsWithChildren<{}> {
  sidebar: React.ReactNode;
}
export default function SplitLayout({ children, sidebar }: SplitLayoutProps) {
  return (
    <div className="grid grid-cols-[2fr_1fr] gap-4">
      {children}
      {sidebar}
    </div>
  );
}
