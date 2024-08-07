import Container from '@/components/common/layout/Container';
import Link from 'next/link';

export default function Header() {
  return (
    <Container>
      <header className="border-b-2 py-4 text-2xl flex justify-between">
        <h1>Geongyu</h1>

        <nav>
          <ul className="flex gap-4">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </nav>
      </header>
    </Container>
  );
}
