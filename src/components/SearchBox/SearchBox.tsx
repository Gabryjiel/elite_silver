import { Dispatch, SetStateAction } from 'react';

interface Props {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  onFocus?: () => void;
  onBlur?: () => void;
}

export function SearchBox(props: Props) {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setSearch(event.target.value);
  };

  return (
    <input
      className="mt-4 w-full rounded-md bg-stone-500 py-2 indent-4 text-2xl text-stone-900 outline-none outline-double placeholder:text-stone-800 focus-visible:outline-8 focus-visible:outline-stone-700"
      type="text"
      placeholder="Szukaj"
      value={props.search}
      onChange={onChange}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
    />
  );
}
