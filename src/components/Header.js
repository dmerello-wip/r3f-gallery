import React  from 'react';
import Link from 'next/link';
import Logo from '@/components/svg/Logo';
import IconContact from '@/components/svg/IconContact';

export default function header() {

  return (
    <div className="header">
      <div className="header__logo">
        <Logo/>
      </div>
      <div className="header__title">
        Liliana Zaccheroni
      </div>
      <nav className="header__nav">
        <div className="header__nav__item">
          <Link href="/about">
            <a>Bio</a>
          </Link>
        </div>
        <div className="header__nav__item">
          <Link href="/about">
            <a>Exhibitions and awards</a>
          </Link>
        </div>
        <div className="header__nav__item">
          <Link href="/contact">
            <div><IconContact/></div>
          </Link>
        </div>
    </nav>
    </div>
  )
}