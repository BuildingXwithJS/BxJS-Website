import { graphql, Link } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';

function IndexPage({
  data: {
    allLink: { distinct: episodes },
  },
}) {
  return (
    <Layout>
      <SEO
        keywords={[`bxjs`, `bxjs-weekly`, `javascript`, `react`]}
        title="BxJS Weekly - All Episodes"
      />

      <div>
        {episodes
          .sort(
            (a, b) =>
              Number(b.replace('Episode ', '')) -
              Number(a.replace('Episode ', ''))
          )
          .map(episodeName => (
            <div key={episodeName}>
              <Link to={`/${episodeName}`}>{episodeName}</Link>
            </div>
          ))}
      </div>
    </Layout>
  );
}

export default IndexPage;

export const pageQuery = graphql`
  query {
    allLink {
      distinct(field: data___episodeName)
    }
  }
`;
