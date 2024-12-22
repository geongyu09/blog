import { IGithub } from '@/components/common/icons';
import Container from '@/components/common/layout/Container';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 bg-white z-50 select-none">
      <Container>
        <div className="py-4 flex justify-between">
          <h1 className="font-bold text-2xl">
            <Link href="/" className="link-hover">
              Geongyu
            </Link>
          </h1>
          <nav className="text-xl">
            <ul className="flex gap-4">
              <li>
                <Link href="/" className="link-hover">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="link-hover">
                  About
                </Link>
              </li>
              <li>
                <Link href="https://github.com/geongyu09" target="_blank">
                  <IGithub />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
}
