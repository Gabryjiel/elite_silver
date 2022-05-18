interface Props {
  name: string;
  tabIndex: number;
  onClick: () => void;
}

export function SetPlayerItem(props: Props) {
  return (
    <div
      onClick={props.onClick}
      onKeyPress={props.onClick}
      tabIndex={props.tabIndex}
      role="button"
      className="w-full cursor-pointer rounded-md border-2 border-stone-600 bg-stone-800 p-4 text-stone-400 hover:brightness-110"
    >
      {props.name}
    </div>
  );
}
