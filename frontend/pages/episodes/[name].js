import groupBy from 'lodash/groupBy';
import { graphqlClient } from '../../components/graphql/client.js';
import { WEEKLY_EPISODE_BY_NAME } from '../../components/graphql/queries/weekly.js';

export default function EpisodePage({ episode }) {
  return (
    <div>
      <h1>
        {episode.name} [{new Date(episode.date).toLocaleDateString()}]
      </h1>
      <div>
        {Object.keys(episode.linksByCategory).map((category) => (
          <div key={category}>
            <h2>{category}</h2>
            {episode.linksByCategory[category].map((link) => (
              <div key={link.id}>
                <a href={link.url}>{link.title}</a>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
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
