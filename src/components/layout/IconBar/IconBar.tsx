import Link from 'next/link';
import { useRouter } from 'next/router';
import { AFillTrophy, IoMdStats, MdGroup } from '../../icons';

export function IconBar() {
  const router = useRouter();

  const icons = [
    { component: AFillTrophy, href: '/tournaments', title: 'Turnieje' },
    { component: MdGroup, href: '/players', title: 'Zawodnicy' },
    { component: IoMdStats, href: '/stats', title: 'Statystyki' },
  ];

  return (
    <div className="flex gap-4 p-4 text-4xl">
      {icons.map((icon) => {
        const isActive = icon.href === router.pathname;
        const fill = isActive
          ? 'fill-lime-500'
          : 'fill-stone-500 hover:fill-stone-300';

        return (
          <Link key={icon.href} href={icon.href} passHref>
            <a title={icon.title}>
              <icon.component className={fill} />
            </a>
          </Link>
        );
      })}
    </div>
  );
}
