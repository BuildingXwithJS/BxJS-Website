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
  const episodeName = groups[0].edges[0].node.data.episodeName;

  return (
    <Layout>
      <SEO
        keywords={[`bxjs`, `bxjs-weekly`, `javascript`, `react`]}
        title={`BxJS Weekly - `}
      />

      <h1 className="text-3xl	py-4">{episodeName}</h1>

      {groups.map(group => (
        <Episode
          key={group.fieldValue}
          name={group.fieldValue}
          date={group.edges[0].node.data.episodeDate}
          links={group.edges}
        />
      ))}
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
