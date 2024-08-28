interface GapProps {
  size: number;
}

export default function Gap({ size }: GapProps) {
  return <div style={{ height: `${size * 0.25}rem` }} />;
}
