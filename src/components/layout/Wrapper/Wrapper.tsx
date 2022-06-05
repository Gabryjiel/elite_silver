type WrapperProps = {
  children?: React.ReactNode;
};

export function Wrapper(props: WrapperProps) {
  return (
    <div className="flex h-screen w-screen flex-col overflow-auto bg-stone-900">
      {props.children}
    </div>
  );
}
