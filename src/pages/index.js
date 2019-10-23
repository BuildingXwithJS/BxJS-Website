import { graphql } from 'gatsby';
import React from 'react';
import Episode from '../components/episode';
import Layout from '../components/layout';
import SEO from '../components/seo';

function IndexPage({
  data: {
    allEpisode: {
      edges: [episode],
    },
  },
}) {
  return (
    <Layout>
      <SEO
        keywords={[`bxjs`, `bxjs-weekly`, `javascript`, `react`]}
        title="BxJS"
      />

      <Episode data={episode.node.data} />
    </Layout>
  );
}

export default IndexPage;

export const pageQuery = graphql`
  query {
    allEpisode(sort: { fields: data___episodeDate, order: DESC }, limit: 1) {
      edges {
        node {
          data {
            episodeUrl
            episodeName
            filename
            episodeDate
            links {
              category
              title
              urls
              urlsSet
            }
          }
          id
        }
      }
    }
  }
`;
