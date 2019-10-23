import { graphql } from 'gatsby';
import React from 'react';
import Episode from '../components/episode';
import Layout from '../components/layout';
import SEO from '../components/seo';

function EpisodePage({
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
        title={`BxJS Weekly - `}
      />

      <Episode data={episode.node.data} />
    </Layout>
  );
}

export default EpisodePage;

export const pageQuery = graphql`
  query($path: String!) {
    allEpisode(filter: { data: { episodeUrl: { eq: $path } } }) {
      edges {
        node {
          id
          data {
            episodeName
            episodeUrl
            episodeDate
            filename
            links {
              category
              title
              urls
              urlsSet
            }
          }
        }
      }
    }
  }
`;
