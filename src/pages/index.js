import { graphql } from 'gatsby';
import _ from 'lodash';
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

  const groupedByCategory = _.groupBy(links, ({ node }) => node.data.category);
  const groups = Object.keys(groupedByCategory)
    .map(category => ({
      fieldValue: category,
      edges: groupedByCategory[category],
    }))
    .flat();

  return (
    <Layout>
      <SEO
        keywords={[`bxjs`, `bxjs-weekly`, `javascript`, `react`]}
        title="BxJS"
      />

      <Episode
        name={`Latest ${episodeName}`}
        date={episodeDate}
        groups={groups}
      />
    </Layout>
  );
}

export default IndexPage;

export const pageQuery = graphql`
  query {
    allLink(sort: { fields: data___episodeDate, order: DESC }, limit: 100) {
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
