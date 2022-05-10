import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" passHref>
      <a className="p-4 text-2xl text-slate-300">Elite Silver</a>
    </Link>
  );
}
