import React, { useState } from 'react';
import { MobileView } from 'react-device-detect';
import { NavigationDrawer } from '../../Mobile/NavigationDrawer';
import { Toolbar } from '../../Mobile/Toolbar';

type Props = {
  children?: React.ReactNode;
};

export function MobileWrapper(props: Props) {
  const [open, setOpen] = useState(false);

  const toggleNavigation = () => {
    setOpen((prev) => !prev);
  };

  const closeNavigation = () => {
    setOpen(() => false);
  };

  return (
    <MobileView>
      <Toolbar toggleNavigation={toggleNavigation} />
      <NavigationDrawer isOpen={open} close={closeNavigation} />
      <div>{props.children}</div>
    </MobileView>
  );
}
