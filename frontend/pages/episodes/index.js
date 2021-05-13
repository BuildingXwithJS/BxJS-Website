import Link from 'next/link';
import { graphqlClient } from '../../components/graphql/client.js';
import { WEEKLY_EPISODES } from '../../components/graphql/queries/weekly.js';

export default function EpisodesListPage({ episodes }) {
  return (
    <div>
      {episodes.map((episode) => (
        <div key={episode.id}>
          <Link href={`/episodes/${episode.name}`}>
            <a>
              {episode.name} [{new Date(episode.date).toLocaleDateString()}]
            </a>
          </Link>
        </div>
      ))}
    </div>
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
