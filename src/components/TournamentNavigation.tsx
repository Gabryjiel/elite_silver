import Link from 'next/link';
import { useRouter } from 'next/router';

const TournamentNavItem = (props: any) => {
    const active =
        props.path === props.href ? 'text-lime-600' : 'text-stone-400';

    return (
        <Link href={props.href} passHref>
            <a
                className={`text-stone-400' grid h-full w-full cursor-pointer place-items-center bg-stone-800 text-xl hover:brightness-125 ${active} ${props.className}`}>
                {props.children}
            </a>
        </Link>
    );
};

export default function TournamentNavigation(props: any) {
    const router = useRouter();

    return (
        <div className='flex flex-grow flex-col'>
            <div className='flex h-32 w-full items-center justify-between text-4xl text-stone-300'>
                <span className='indent-32'>{props.name}</span>
                <div className='mr-32 flex flex-col justify-center text-3xl'>
                    <span>{props.winner}</span>
                    <span className='text-center text-sm'>Zwycięzca</span>
                </div>
            </div>
            <div className='w-full px-32'>
                <div className='flex h-16 w-full justify-around rounded-xl bg-stone-700'>
                    <TournamentNavItem
                        className='rounded-l-xl'
                        path={router.asPath}
                        href={`/tournaments/${props.tournamentId}`}>
                        Informacje
                    </TournamentNavItem>
                    <TournamentNavItem
                        path={router.asPath}
                        href={`/tournaments/${props.tournamentId}/schema`}>
                        Drabinka
                    </TournamentNavItem>
                    <TournamentNavItem
                        path={router.asPath}
                        href={`/tournaments/${props.tournamentId}/players`}>
                        Zawodnicy
                    </TournamentNavItem>
                    <TournamentNavItem
                        className='rounded-r-xl'
                        path={router.asPath}
                        href={`/tournaments/${props.tournamentId}/matches`}>
                        Mecze
                    </TournamentNavItem>
                </div>
            </div>
        </div>
    );
}
