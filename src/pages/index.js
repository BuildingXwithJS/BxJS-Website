import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';

function IndexPage() {
  return (
    <Layout>
      <SEO
        keywords={[`bxjs`, `bxjs-weekly`, `javascript`, `react`]}
        title="BxJS"
      />
    </Layout>
  );
}

export default IndexPage;
