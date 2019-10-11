import { graphql, Link } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';

function IndexPage({
  data: {
    allLink: { edges },
  },
}) {
  const episodes = [];
  edges
    .map(({ node }) => ({
      episodeUrl: node.data.episodeUrl,
      episodeName: node.data.episodeName,
    }))
    .forEach(ep => {
      if (episodes.find(e => e.episodeUrl === ep.episodeUrl)) {
        return;
      }
      episodes.push(ep);
    });

  return (
    <Layout>
      <SEO
        keywords={[`bxjs`, `bxjs-weekly`, `javascript`, `react`]}
        title="BxJS Weekly - All Episodes"
      />

      <h1 className="text-3xl	py-4">Episodes list</h1>

      {episodes
        .sort(
          (a, b) =>
            Number(b.episodeUrl.replace('/Episode', '')) -
            Number(a.episodeUrl.replace('/Episode', ''))
        )
        .map(episode => (
          <div key={episode.episodeUrl} className="py-1">
            <Link
              className="text-lg text-blue-700"
              to={`/${episode.episodeUrl}`}
            >
              {episode.episodeName}
            </Link>
          </div>
        ))}
    </Layout>
  );
}

export default IndexPage;

export const pageQuery = graphql`
  query {
    allLink {
      edges {
        node {
          data {
            episodeUrl
            episodeName
          }
        }
      }
    }
  }
`;
