import Link from 'next/link';

export default function Header() {
  return (
    <header className="px-8 py-4 flex justify-between">
      <h1 className="font-bold text-2xl">Geongyu</h1>
      <nav className="text-xl">
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
  );
}
