import Link from 'next/link';

type Props = {
  items: {
    href: string;
    label: string;
  }[];
  path: string;
};

export function PageNavigation({ items, path }: Props) {
  return (
    <div className="flex h-16 justify-around rounded-xl bg-stone-700">
      {items.map((item, index) => {
        const active = path === item.href ? 'text-lime-600' : 'text-stone-400';
        const roundedL = index === 0 ? 'rounded-l-xl' : '';
        const roundedR = index === items.length - 1 ? 'rounded-r-xl' : '';

        return (
          <Link key={`pageNavigation-${item.label}`} href={item.href} passHref>
            <a
              className={`grid h-full w-full cursor-pointer select-none place-items-center bg-stone-800 px-12 text-xl hover:brightness-125 ${active} ${roundedL} ${roundedR}`}
            >
              {item.label}
            </a>
          </Link>
        );
      })}
    </div>
  );
}
