import { useMemo } from 'react';
import { useQuery } from 'urql';
import Giveaway from '../components/giveaway/index.js';
import Prize from '../components/giveaway/prize.js';
import {
  OPEN_GIVEAWAYS,
  OPEN_USER_GIVEAWAYS,
  USER_PRIZES,
} from '../components/graphql/queries/giveaways.js';
import { useUser } from '../components/hooks/user.js';
import Layout from '../components/layout/index.js';

export default function GiveawaysPage() {
  const { user } = useUser();
  const [publicResult] = useQuery({
    query: OPEN_GIVEAWAYS,
    pause: user,
  });
  const [result, reexecuteQuery] = useQuery({
    query: OPEN_USER_GIVEAWAYS,
    pause: !user,
  });
  const [prizesResult] = useQuery({
    query: USER_PRIZES,
    pause: !user,
  });

  const publicGiveaways = useMemo(
    () => publicResult.data?.giveaways_giveaway ?? [],
    [publicResult]
  );

  const userGiveaways = useMemo(() => result?.data?.giveaways_giveaway, [
    result,
  ]);

  const userPrizes = useMemo(() => prizesResult?.data?.giveaways_prize, [
    prizesResult,
  ]);

  const loading = publicResult.fetching || result.fetching;

  return (
    <Layout>
      <h1 className="text-3xl	py-4">BxJS Giveaways</h1>

      <h2 className="text-2xl py-4">Open giveaways</h2>

      {loading && <div>Loading..</div>}

      {!userGiveaways?.length && !publicGiveaways?.length && (
        <div>No open giveaways!</div>
      )}

      {userGiveaways?.length &&
        userGiveaways.map((giveaway) => (
          <Giveaway
            key={giveaway.id}
            giveaway={giveaway}
            user={user}
            reexecute={reexecuteQuery}
          />
        ))}

      {!userGiveaways?.length &&
        publicGiveaways.map((giveaway) => (
          <Giveaway key={giveaway.id} giveaway={giveaway} />
        ))}

      <h2 className="text-2xl py-4">Your prizes</h2>

      {userPrizes?.map((prize) => (
        <Prize key={prize.id} prize={prize} />
      ))}
    </Layout>
  );
}
