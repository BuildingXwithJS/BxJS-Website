import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { useQuery } from 'urql';
import Giveaway from '../components/giveaway/index.js';
import { graphqlClient } from '../components/graphql/client.js';
import {
  OPEN_GIVEAWAYS,
  OPEN_USER_GIVEAWAYS,
  USER_PRIZES,
} from '../components/graphql/queries/giveaways.js';
import { useUser } from '../components/hooks/user.js';
import Layout from '../components/layout/index.js';

export default function GiveawaysPage({ publicGiveaways }) {
  const { user } = useUser();
  const [result, reexecuteQuery] = useQuery({
    query: OPEN_USER_GIVEAWAYS,
    pause: !user,
  });
  const [prizesResult] = useQuery({
    query: USER_PRIZES,
    pause: !user,
  });

  const userGiveaways = useMemo(() => result?.data?.giveaways_giveaway, [
    result,
  ]);

  const userPrizes = useMemo(() => prizesResult?.data?.giveaways_prize, [
    prizesResult,
  ]);

  return (
    <Layout>
      <h1 className="text-3xl	py-4">BxJS Giveaways</h1>

      <h2 className="text-2xl py-4">Open giveaways</h2>

      {result.fetching && <div>Loading..</div>}

      {!userGiveaways?.length && !publicGiveaways?.length && (
        <div>No open giveaways!</div>
      )}

      {userGiveaways &&
        userGiveaways.map((giveaway) => (
          <Giveaway
            key={giveaway.id}
            giveaway={giveaway}
            user={user}
            reexecute={reexecuteQuery}
          />
        ))}

      {!userGiveaways &&
        publicGiveaways.map((giveaway) => (
          <Giveaway key={giveaway.id} giveaway={giveaway} />
        ))}

      <h2 className="text-2xl py-4">Your prizes</h2>

      {userPrizes?.map((prize) => (
        <div className="flex flex-col">
          <h3 className="text-xl">{prize.name}</h3>
          <div className="prose">
            <ReactMarkdown>{prize.description}</ReactMarkdown>
          </div>
        </div>
      ))}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { data, error } = await graphqlClient.query(OPEN_GIVEAWAYS).toPromise();

  if (error) {
    console.error(error);
  }

  // get giveaways data
  const publicGiveaways = data?.giveaways_giveaway ?? [];

  return {
    props: {
      publicGiveaways,
    }, // will be passed to the page component as props
  };
}
