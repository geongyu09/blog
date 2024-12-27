import { PropsWithChildren } from 'react';

interface SideBarMenuProps extends PropsWithChildren {}

export default function SideBarMenu({ children }: SideBarMenuProps) {
  return <aside className="sticky top-16">{children}</aside>;
}
