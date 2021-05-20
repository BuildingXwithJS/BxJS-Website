import { createGraphqlClientWithAdminSecret } from '../../components/graphql/client.js';
import {
  SERVER_ALL_GIVEAWAY,
  SERVER_CLOSE_GIVEAWAY,
  SERVER_UPDATE_PRIZE,
} from '../../components/graphql/queries/giveaways.js';

const decideWinner = (participants, oldWinners = []) => {
  const max = participants.length;
  let winner;
  do {
    const winnerIndex = Math.floor(Math.random() * max);
    winner = participants[winnerIndex];
  } while (oldWinners.find((w) => w.user === winner.user));
  return winner;
};

export default async function handler(req, res) {
  const adminClient = createGraphqlClientWithAdminSecret(
    process.env.HASURA_GRAPHQL_ADMIN_SECRET
  );

  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await adminClient
    .query(SERVER_ALL_GIVEAWAY, { date: today })
    .toPromise();

  if (error) {
    throw error;
  }

  const openGiveaways = data?.giveaways_giveaway;

  for (const giveaway of openGiveaways) {
    const { id, prizes, participants } = giveaway;

    // determine winners
    const winnersNumber = prizes.length;
    const winners = [];
    for (let i = 0; i < winnersNumber; i++) {
      const winner = decideWinner(participants, winners);
      winners.push(winner);
    }

    // assign prizes to winners
    for (let i = 0; i < prizes.length; i++) {
      const prize = prizes[i];
      const winner = winners[i];
      await adminClient
        .mutation(SERVER_UPDATE_PRIZE, {
          prize: prize.id,
          user: winner.user,
        })
        .toPromise();
    }

    // complete the giveaway
    await adminClient
      .mutation(SERVER_CLOSE_GIVEAWAY, {
        giveaway: id,
      })
      .toPromise();
  }

  res.status(200).json({ done: true });
}
