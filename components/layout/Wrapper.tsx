import Navigation from './Navigation';

type WrapperProps = {
  children: React.ReactNode;
};

export default function Wrapper(props: WrapperProps) {
  return (
    <div className="flex h-screen w-screen bg-stone-900">
      <Navigation />
      {props.children}
    </div>
  );
}
