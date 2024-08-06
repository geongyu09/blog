import { PropsWithChildren } from 'react';

export default function LayoutWrapper({ children }: PropsWithChildren) {
  return <div className="mx-auto max-w-7xl">{children}</div>;
}
