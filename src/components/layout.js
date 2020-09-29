import 'loaders.css';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Header from './header';
import { DarkTheme } from './theme.service';

function Layout({ children }) {
  const [isDarkThemeEnabled, setIsDarkThemeEnabled] = useState(DarkTheme.isEnabled);
  DarkTheme.subscribe(setIsDarkThemeEnabled);

  return (
    <div className={`${isDarkThemeEnabled?`text-gray-600 bg-gray-900`:`text-gray-900`} flex flex-col font-sans min-h-screen`} >
      <Header />

      <main className="flex flex-col flex-1 max-w-4xl mx-auto px-4 py-8 md:p-8 w-full">
        {children}
      </main>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
