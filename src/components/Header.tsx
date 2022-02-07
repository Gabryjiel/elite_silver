import Link from 'next/link';

const HeaderItem = (props: any) => (
    <Link href={props.href} passHref>
        <a className='cursor-pointer'>{props.children}</a>
    </Link>
);

export default function Header() {
    return (
        <header className='flex h-16 w-full justify-between bg-slate-900 text-gray-200'>
            <div className='flex h-full w-64 items-center justify-center'>
                <span className='z-10 text-2xl text-slate-300'>
                    <HeaderItem href='/'>Prokrastynatorzy</HeaderItem>
                </span>
            </div>
            <div className='grid h-full w-32 place-items-center'>
                <span>
                    <HeaderItem href='/account'>Konto</HeaderItem>
                </span>
            </div>
        </header>
    );
}
