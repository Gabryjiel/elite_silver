import Link from "next/link";
import { useRouter } from "next/router";

const NavBox = (props: any) => {
    const active = props.path.split('/')[1].includes(props.href.slice(1)) ? 'text-lime-700 brightness-110': 'text-stone-400'

    return (
        <Link href={props.href} passHref>
            <a className={`w-64 text-xl my-2 h-16 flex indent-6 items-center bg-stone-800 text-stone-400 hover:brightness-125 rounded-xl ${active}`}>
                {props.children}
            </a>
        </Link>
    );
};

export default function Navigation() {
    const router = useRouter()

    return (
        <div className="flex h-full w-80 bg-stone-800 border-r-2 border-stone-700 flex-col items-center">
            <div className="my-8 h-16 grid place-items-center">
                <span className="text-stone-300 text-3xl">
                    <Link href="/" passHref>Prokrastynatorzy</Link>
                </span>
            </div>
            <NavBox path={router.pathname} href="/tournaments">Turnieje</NavBox>
            <NavBox path={router.pathname} href="/players">Zawodnicy</NavBox>
            <NavBox path={router.pathname} href="/stats">Statystyki</NavBox>
            <NavBox path={router.pathname} href="/account">Konto</NavBox>
        </div>
    )
}