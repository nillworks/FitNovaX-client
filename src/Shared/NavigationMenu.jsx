import React from 'react';
import ActiveLink from './ActiveLink';
import ProfileDropDown from './ProfileDropDown';
import MobileMenu from './MobileMenu';

const NavigationMenu = () => {
  return (
    <nav>
      <ActiveLink />
      <ProfileDropDown />
      <MobileMenu />
    </nav>
  );
};

export default NavigationMenu;
