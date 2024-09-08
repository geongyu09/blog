import { IGithub } from '@/components/common/icons';
import Container from '@/components/common/layout/Container';
import Link from 'next/link';

export default function Header() {
  return (
    <Container>
      <header className="py-4 flex justify-between">
        <h1 className="font-bold text-2xl">Geongyu</h1>
        <nav className="text-xl">
          <ul className="flex gap-4">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="https://github.com/geongyu09" target="_blank">
                <IGithub />
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </Container>
  );
}
