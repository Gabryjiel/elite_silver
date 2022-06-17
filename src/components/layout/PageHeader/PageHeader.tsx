import Link from 'next/link';

type Props = {
  asPath: string;
  text: string;
  navLinks: {
    href: string;
    label: string;
  }[];
};

export function PageHeader({ asPath, navLinks, text }: Props) {
  return (
    <div className="flex h-32 w-full items-center justify-between pr-32">
      <div className="w-2/6 text-center">
        <span className="text-4xl font-bold text-stone-300">{text}</span>
      </div>
      <div className="flex h-16 w-4/6 justify-around rounded-xl bg-stone-700">
        {navLinks.map((item, index) => {
          const active =
            asPath === item.href ? 'text-lime-600' : 'text-stone-400';
          const roundedL = index === 0 ? 'rounded-l-xl' : '';
          const roundedR = index === navLinks.length - 1 ? 'rounded-r-xl' : '';

          return (
            <Link
              key={`pageNavigation-${item.label}`}
              href={item.href}
              passHref
            >
              <a
                className={`grid h-full w-full cursor-pointer select-none place-items-center bg-stone-800 px-12 text-xl hover:brightness-125 ${active} ${roundedL} ${roundedR}`}
              >
                {item.label}
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
