import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Dispatch, SetStateAction, useState } from 'react';

export type GlobalContext = {
  card: number;
  setCard: Dispatch<SetStateAction<number>>;
};

function MyApp({ Component, pageProps }: AppProps) {
  const [card, setCard] = useState(0);

  return <Component {...pageProps} card={card} setCard={setCard} />;
}
export default MyApp;
