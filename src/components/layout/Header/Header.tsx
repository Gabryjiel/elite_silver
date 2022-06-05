import { IconBar } from '../IconBar';
import { Logo } from '../Logo';

export function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-16 w-full justify-between border-b-2 border-b-stone-700 bg-stone-900 px-4 text-gray-200">
      <Logo />
      <IconBar />
    </header>
  );
}
