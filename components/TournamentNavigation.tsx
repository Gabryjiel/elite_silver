import Link from "next/link";
import { useRouter } from "next/router";

const TournamentNavItem = (props: any) => {
    const active = props.path === props.href ? 'text-lime-700' : '';

    return (
        <Link href={props.href} passHref>
            <a className={`text-stone-400' h-full w-full grid place-items-center cursor-pointer bg-stone-800 text-stone-400 hover:brightness-125 text-xl ${active} ${props.className}`}>
                {props.children}
            </a>
        </Link>
    )
};

export default function TournamentNavigation(props: any) {
    const router = useRouter();

    return (
        <div className="flex flex-col flex-grow">
          <div className="text-white h-32 w-full flex justify-between items-center text-4xl">
            <span className="indent-32">{props.name}</span>
            <div className="flex flex-col justify-center mr-32">
              <span>{props.winner}</span>
              <span className="text-sm text-center">Zwycięzca</span>
            </div>
          </div>
          <div className="w-full px-16">
            <div className="w-full h-16 rounded-xl bg-stone-700 flex justify-around">
                <TournamentNavItem className="rounded-l-xl" path={router.asPath} href={`/tournaments/${props.tournamentId}`}>Informacje</TournamentNavItem>
                <TournamentNavItem path={router.asPath} href={`/tournaments/${props.tournamentId}/schema`}>Drabinka</TournamentNavItem>
                <TournamentNavItem path={router.asPath} href={`/tournaments/${props.tournamentId}/players`}>Zawodnicy</TournamentNavItem>
                <TournamentNavItem className="rounded-r-xl" path={router.asPath} href={`/tournaments/${props.tournamentId}/matches`}>Mecze</TournamentNavItem>
            </div>
        </div>
        </div>
       
    );
}