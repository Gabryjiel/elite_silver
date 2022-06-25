import '../styles/globals.css';
import { Dispatch, SetStateAction, useState } from 'react';
import { AppPropsWithLayout } from '../types';

export type GlobalContext = {
  card: number;
  setCard: Dispatch<SetStateAction<number>>;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [card, setCard] = useState(0);

  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(<Component {...pageProps} card={card} setCard={setCard} />);
}
