import Link from 'next/link';

export interface BreadcrumbsLink {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  links: BreadcrumbsLink[];
}

export function Breadcrumbs(props: BreadcrumbsProps) {
  const { links } = props;

  return null;

  return (
    <div className="flex h-10 w-full items-center border-b-2 border-b-stone-700 py-2 text-stone-200 ">
      {links.map((link, idx) => {
        if (idx === links.length - 1) {
          return (
            <div key={link.label} className="px-6 font-bold">
              {link.label}
            </div>
          );
        }

        return (
          <div key={link.label} className="flex">
            <Link href={link.href} passHref>
              <a className="px-6 hover:underline">{link.label}</a>
            </Link>
            <div>{'>>'}</div>
          </div>
        );
      })}
    </div>
  );
}
