import Link from "next/link"

const HeaderItem = (props: any) => <Link href={props.href} passHref><a className='cursor-pointer'>{props.children}</a></Link>

export default function Header() {
    return (
        <header className="w-full h-16 flex justify-between text-gray-200 bg-slate-900">
          <div className="w-64 h-full flex items-center justify-center">
              <span className="text-slate-300 text-2xl z-10">
                <HeaderItem href="/">Prokrastynatorzy</HeaderItem>
              </span>
            </div>
          <div className="w-32 h-full grid place-items-center">
            <span>
              <HeaderItem href="/account">Konto</HeaderItem>
            </span>
          </div>
        </header>
    )
}