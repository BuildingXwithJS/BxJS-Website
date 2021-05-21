import React from 'react';
import Footer from '../footer/index.js';
import Header from '../header/index.js';
import PageHead from '../seo/index.js';

function LayoutWrapper({ children }) {
  return (
    <div className="dark:bg-gray-900 bg-white text-black dark:text-gray-400 flex flex-col font-sans min-h-screen">
      <Header />

      <main className="flex flex-col flex-1 max-w-4xl mx-auto px-4 py-8 md:p-8 w-full">
        {children}
      </main>

      <Footer />
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
