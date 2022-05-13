import Link from 'next/link';

type TournamentNavItemProps = {
  path: string;
  href: string;
  children: React.ReactNode;
  className?: string;
};

export default function TournamentNavItem(props: TournamentNavItemProps) {
  const active = props.path === props.href ? 'text-lime-600' : 'text-stone-400';

  return (
    <Link href={props.href} passHref>
      <a
        className={`grid h-full w-full cursor-pointer select-none place-items-center bg-stone-800 text-xl hover:brightness-125 ${active} ${props.className}`}
      >
        {props.children}
      </a>
    </Link>
  );
}
