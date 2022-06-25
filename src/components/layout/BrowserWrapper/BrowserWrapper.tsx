import React from 'react';
import { BrowserView } from 'react-device-detect';
import { Header } from '../Header';

type Props = {
  children?: React.ReactNode;
};

export function BrowserWrapper(props: Props) {
  return (
    <BrowserView>
      <div className="flex h-screen w-screen flex-col overflow-hidden bg-stone-900">
        <Header />
        {props.children}
      </div>
    </BrowserView>
  );
}
