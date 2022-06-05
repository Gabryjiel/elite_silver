import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" passHref>
      <a className=" flex h-full select-none items-center p-2 font-mono text-4xl text-slate-300">
        ES
      </a>
    </Link>
  );
}
