import Link from 'next/link';
import { useRouter } from 'next/router';

const NavBox = (props: any) => {
  const active = props.path.split('/')[1].includes(props.href.slice(1))
    ? 'text-lime-600 brightness-110'
    : 'text-stone-400';

  return (
    <Link href={props.href} passHref>
      <a
        className={`my-2 flex h-16 w-64 items-center rounded-xl bg-stone-800 indent-6 text-xl hover:brightness-125 ${active}`}
      >
        {props.children}
      </a>
    </Link>
  );
};

export function Navigation() {
  const router = useRouter();

  const routes = [
    { label: 'Turnieje', href: '/tournaments' },
    { label: 'Zawodnicy', href: '/players' },
    { label: 'Mecze', href: '/matches' },
    { label: 'Bohaterowie', href: '/champions' },
    { label: 'Statystyki', href: '/stats' },
  ];

  return (
    <div className="flex h-full w-80 flex-col items-center border-r-2 border-stone-700 bg-stone-800">
      <div className="my-8 grid h-16 place-items-center">
        <span className="text-3xl text-stone-300">
          <Link href="/" passHref>
            Elite Silver
          </Link>
        </span>
      </div>
      {routes.map((route) => (
        <NavBox key={route.href} path={router.pathname} href={route.href}>
          {route.label}
        </NavBox>
      ))}
    </div>
  );
}
