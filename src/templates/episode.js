import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';

function EpisodePage({
  data: {
    allLink: { group },
  },
}) {
  return (
    <Layout>
      <SEO keywords={[`bxjs`, `bxjs-weekly`, `javascript`, `react`]} title={`BxJS Weekly - `} />

      <div>
        <pre>{JSON.stringify(group, null, 2)}</pre>
      </div>
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
