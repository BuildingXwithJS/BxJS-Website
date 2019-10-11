import { graphql } from 'gatsby';
import React from 'react';
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
        <div key={group.fieldValue}>
          <h2 className="text-xl py-3">{group.fieldValue}</h2>

          <ul className="list-disc list-inside">
            {group.edges.map(({ node }) => (
              <li key={node.id} className="py-1">
                <a className="text-blue-700" href={node.data.urls}>
                  {node.data.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
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
