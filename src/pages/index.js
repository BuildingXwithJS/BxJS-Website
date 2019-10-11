import React from 'react';
import Episode from '../components/episode';
import Layout from '../components/layout';
import SEO from '../components/seo';

function IndexPage({
  data: {
    allLink: { edges },
  },
}) {
  const { episodeName, episodeDate } = edges[0].node.data;
  const links = edges.filter(
    ({ node }) => node.data.episodeName === episodeName
  );

  return (
    <Layout>
      <SEO
        keywords={[`bxjs`, `bxjs-weekly`, `javascript`, `react`]}
        title="BxJS"
      />

      <h1 className="text-3xl	py-4">Latest episode</h1>

      <Episode name={episodeName} date={episodeDate} links={links} />
    </Layout>
  );
}

export default IndexPage;

export const pageQuery = graphql`
  query {
    allLink(sort: { fields: data___episodeDate, order: DESC }) {
      edges {
        node {
          data {
            episodeUrl
            episodeName
            category
            title
            urls
            urlsSet
            filename
            episodeDate
          }
          id
        }
      }
    }
  }
`;
