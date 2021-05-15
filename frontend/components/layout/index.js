import React from 'react';
import Header from '../header/index.js';
import PageHead from '../seo/index.js';
import { themeStyles, useTheme } from '../theme/index.js';

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

export default function Layout({ children, title }) {
  return (
    <>
      <PageHead title={title} />

      <LayoutWrapper>{children}</LayoutWrapper>
    </>
  );
}
