import Link from 'next/link';
import { graphqlClient } from '../../components/graphql/client.js';
import { WEEKLY_EPISODES } from '../../components/graphql/queries/weekly.js';
import Layout from '../../components/layout/index.js';
import { useTheme } from '../../components/theme/index.js';

export default function EpisodesListPage({ episodes }) {
  const { theme } = useTheme();

  return (
    <Layout title="BxJS Weekly - Episodes list">
      <h1 className="text-3xl	py-4">BxJS Weekly - Episodes list</h1>

      {episodes.map((episode) => (
        <div key={episode.id} className="py-1 hover:underline">
          <Link href={`/episodes/${episode.name}`}>
            <a
              className={`text-lg ${
                theme === 'dark' ? 'text-blue-100' : 'text-blue-700'
              }`}
            >
              {episode.name}
              <span
                className={`pl-2 text-base ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`}
              >
                from {new Date(episode.date).toLocaleDateString()}
              </span>
            </a>
          </Link>
        </div>
      ))}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const {
    data: { bxjsweekly_episodes },
  } = await graphqlClient.query(WEEKLY_EPISODES, {}).toPromise();

  return {
    props: {
      episodes: bxjsweekly_episodes,
    }, // will be passed to the page component as props
  };
}
