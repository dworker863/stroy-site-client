import Link from 'next/link';
import React, { FC } from 'react';
import { INavMobile } from './INavMobile';
import {
  StyledMobileMenu,
  StyledNavMobile,
  StyledNavMobileItem,
} from './StyledNavMobile';

const NavMobile: FC<INavMobile> = ({ isActive, navClickHandler }) => {
  return (
    <StyledNavMobile isActive={isActive} onClick={navClickHandler}>
      <StyledMobileMenu>
        <StyledNavMobileItem>
          <Link href="/about">О нас</Link>
        </StyledNavMobileItem>
        <StyledNavMobileItem>
          <Link href="/projects">Работы</Link>
        </StyledNavMobileItem>
        <StyledNavMobileItem>
          <Link href="/calculator">Калькулятор</Link>
        </StyledNavMobileItem>
        <StyledNavMobileItem>
          <Link href="/contacts">Контакты</Link>
        </StyledNavMobileItem>
      </StyledMobileMenu>
    </StyledNavMobile>
  );
};

export default NavMobile;