import { PropsWithChildren } from 'react';

interface WrapperProps extends PropsWithChildren<{}> {
  padding: number;
}
export default function Wrapper({ children, padding }: WrapperProps) {
  const style = {
    paddingInline: `${0.25 * padding}rem`,
  };

  return <div style={style}>{children}</div>;
}
