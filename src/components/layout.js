import 'loaders.css';
import PropTypes from 'prop-types';
import React from 'react';
import Header from './header';
import { themeStyles, ThemeWrapper, useTheme } from './theme';

function LayoutWrapper({ children }) {
  const { theme } = useTheme();

  return (
    <div
      className={`${themeStyles[theme].pageBg} ${themeStyles[theme].text} flex flex-col font-sans min-h-screen`}
    >
      <Header />

      <main className="flex flex-col flex-1 max-w-4xl mx-auto px-4 py-8 md:p-8 w-full">
        {children}
      </main>
    </div>
  );
}

function Layout({ children }) {
  return (
    <ThemeWrapper>
      <LayoutWrapper>{children}</LayoutWrapper>
    </ThemeWrapper>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
