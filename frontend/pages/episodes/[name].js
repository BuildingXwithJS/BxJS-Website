import groupBy from 'lodash/groupBy';
import Episode from '../../components/episode/index.js';
import { graphqlClient } from '../../components/graphql/client.js';
import { WEEKLY_EPISODE_BY_NAME } from '../../components/graphql/queries/weekly.js';
import Layout from '../../components/layout/index.js';

export default function EpisodePage({ episode }) {
  return (
    <Layout title="BxJS Weekly - Episodes list">
      <Episode data={episode} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // get episode name
  const {
    params: { name },
  } = context;

  const {
    data: { bxjsweekly_episodes },
  } = await graphqlClient.query(WEEKLY_EPISODE_BY_NAME, { name }).toPromise();

  const episode = bxjsweekly_episodes[0];

  episode.linksByCategory = groupBy(episode.links, 'category');

  return {
    props: {
      episode,
    }, // will be passed to the page component as props
  };
}
