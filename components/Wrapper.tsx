import Navigation from "./Navigation";

export default function Wrapper(props: any) {
    return (
        <div className='bg-stone-900 w-screen h-screen flex'>
            <Navigation />
            {props.children}
        </div>
    );
}