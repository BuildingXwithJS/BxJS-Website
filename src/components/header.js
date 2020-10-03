import { graphql, Link, useStaticQuery } from 'gatsby';
import React, { useState } from 'react';
import Search from './search';
import { DarkTheme } from './theme.service';

function Header() {
  const [isExpanded, toggleExpansion] = useState(false);
  const [isDarkThemeEnabled, setIsDarkThemeEnabled] = useState(
    DarkTheme.isEnabled
  );
  DarkTheme.subscribe(setIsDarkThemeEnabled);

  const { site } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <header
      className={`${isDarkThemeEnabled ? `bg-yellow-900` : `bg-yellow-600`}`}
    >
      <div className="flex flex-wrap items-center justify-between max-w-4xl mx-auto p-4">
        <div className="flex items-center gap-6">
          <Link
            className={`${
              isDarkThemeEnabled ? `text-gray-600` : `text-white`
            } flex items-center no-underline`}
            to="/"
          >
            <span className="font-bold text-xl tracking-tight">
              {site.siteMetadata.title}
            </span>
          </Link>
          <button
            className={`${
              isDarkThemeEnabled
                ? `bg-gray-900 hover:bg-gray-900`
                : `bg-white-900 hover:bg-white-900`
            } text-gray-600 font-bold py-2 px-4 border border-blue-700 rounded`}
            onClick={() => DarkTheme.next(!DarkTheme.isEnabled)}
          >
            Dark Mode
          </button>
        </div>

        <button
          className={`${
            isDarkThemeEnabled ? `text-gray-600` : `text-white`
          } block md:hidden border border-white flex items-center px-3 py-2 rounded`}
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
          <Search />
          {[
            {
              route: `/episodesList`,
              title: `All episodes`,
            },
          ].map(link => (
            <Link
              className={`${
                isDarkThemeEnabled ? `text-gray-600` : `text-white`
              } block md:inline-block mt-4 md:mt-0 md:ml-6 hover:underline hover:text-gray-300`}
              key={link.title}
              to={link.route}
            >
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
