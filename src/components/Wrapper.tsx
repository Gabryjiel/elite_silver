import Navigation from './Navigation';

export default function Wrapper(props: any) {
    return (
        <div className='flex h-screen w-screen bg-stone-900'>
            <Navigation />
            {props.children}
        </div>
    );
}
