import { graphql } from 'gatsby';
import React from 'react';
import Episode from '../components/episode';
import Layout from '../components/layout';
import SEO from '../components/seo';

function EpisodePage({
  data: {
    allLink: { group: groups },
  },
}) {
  const firstEntry = groups[0].edges[0].node.data;
  const { episodeName, episodeDate } = firstEntry;

  return (
    <Layout>
      <SEO
        keywords={[`bxjs`, `bxjs-weekly`, `javascript`, `react`]}
        title={`BxJS Weekly - `}
      />

      <Episode name={episodeName} date={episodeDate} groups={groups} />
    </Layout>
  );
}

export default EpisodePage;

export const pageQuery = graphql`
  query($path: String!) {
    allLink(filter: { data: { episodeUrl: { eq: $path } } }) {
      group(field: data___category) {
        field
        fieldValue
        edges {
          node {
            id
            data {
              category
              episodeName
              episodeDate
              filename
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
