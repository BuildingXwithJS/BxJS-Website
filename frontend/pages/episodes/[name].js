import groupBy from 'lodash/groupBy';
import Link from 'next/link';
import Episode from '../../components/episode/index.js';
import { graphqlClient } from '../../components/graphql/client.js';
import { WEEKLY_EPISODE_BY_NAME } from '../../components/graphql/queries/weekly.js';
import Layout from '../../components/layout/index.js';

export default function EpisodePage({ episode }) {
  return (
    <Layout title="BxJS Weekly - Episodes list">
      {episode && <Episode data={episode} />}
      {!episode && (
        <div className="flex flex-col">
          <p className="text-2xl">
            <b>Oops!</b> Episode was not found!
          </p>

          <p className="pt-2">
            Pick existing one from{' '}
            <Link href="/episodes">
              <a className="underline">list of available episodes</a>
            </Link>
          </p>
        </div>
      )}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // get episode name
  const {
    params: { name },
  } = context;

  const { data, error } = await graphqlClient
    .query(WEEKLY_EPISODE_BY_NAME, { name })
    .toPromise();

  if (error) {
    console.error(error);
  }

  const episode = data?.bxjsweekly_episodes?.[0] ?? null;

  if (episode) {
    episode.linksByCategory = groupBy(episode.links, 'category');
  }

  return {
    props: {
      episode,
    }, // will be passed to the page component as props
  };
}
