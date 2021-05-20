import { signIn } from 'next-auth/client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useUser } from '../hooks/user.js';
import MoonIcon from '../icons/moonIcon.js';
import SunIcon from '../icons/sunIcon.js';
import Search from '../search/index.js';
import { themeStyles, useTheme } from '../theme/index.js';

function Header() {
  const [isExpanded, toggleExpansion] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user } = useUser();

  return (
    <header className={themeStyles[theme].headerBg}>
      <div className="flex flex-wrap items-center justify-between max-w-4xl mx-auto p-4">
        <Link href="/">
          <a
            className={`${themeStyles[theme].headerText} flex items-center no-underline`}
          >
            <span className="font-bold text-xl tracking-tight">BxJS</span>
          </a>
        </Link>

        <button
          className={`${themeStyles[theme].headerText} block md:hidden border border-white flex items-center px-3 py-2 rounded`}
          onClick={() => toggleExpansion(!isExpanded)}
        >
          <svg
            className="fill-current w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>

        <nav
          className={`${
            isExpanded ? `block` : `hidden`
          } md:block md:flex md:items-center w-full md:w-auto`}
        >
          {user && (
            <Link href="/giveaways">
              <a
                className={`${themeStyles[theme].headerText} flex items-center no-underline mr-4`}
              >
                <span className="font-semibold text-lg tracking-tight">
                  Giveaways
                </span>
              </a>
            </Link>
          )}
          {!user && (
            <button className="flex mr-4" onClick={() => signIn()}>
              Sign in
            </button>
          )}

          <Search />
          {[
            {
              route: `/episodes`,
              title: `All episodes`,
            },
          ].map((link) => (
            <Link key={link.title} href={link.route}>
              <a className="block md:inline-block mt-4 md:mt-0 md:ml-6 hover:underline hover:text-gray-300 text-white">
                {link.title}
              </a>
            </Link>
          ))}

          <button
            className={`${themeStyles[theme].bgHover} ${themeStyles[theme].headerText} font-bold p-2 bg-opacity-0 rounded-full ml-2 focus:outline-none`}
            onClick={() => toggleTheme()}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
