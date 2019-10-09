import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';

function IndexPage() {
  return (
    <Layout>
      <SEO keywords={[`bxjs`, `bxjs-weekly`, `javascript`, `react`]} title="BxJS" />

      <section className="text-center">
        <h2 className="bg-yellow-400 text-2xl font-bold inline-block my-8 p-3">
          Hey there! Welcome to your first Gatsby site.
        </h2>

        <p className="leading-loose">
          This is a barebones starter for Gatsby styled using{` `}
          <a className="font-bold no-underline text-gray-900" href="https://tailwindcss.com/">
            Tailwind
          </a>
          , a utility-first CSS framework.
        </p>
      </section>
    </Layout>
  );
}

export default IndexPage;
