import { gql } from 'urql';

export const OPEN_GIVEAWAYS = gql`
  query OpenGiveaway {
    giveaways_giveaway(where: { ended: { _eq: false } }) {
      id
      name
      description
      ends_at
      updated_at
      created_at
    }
  }
`;

export const OPEN_USER_GIVEAWAYS = gql`
  query OpenGiveaway {
    giveaways_giveaway(where: { ended: { _eq: false } }) {
      id
      name
      description
      participants {
        id
        user
      }
      ends_at
      updated_at
      created_at
    }
  }
`;

export const USER_PRIZES = gql`
  query UserPrizes {
    giveaways_prize {
      id
      name
      description
      giveaway
      owner
      updated_at
      created_at
    }
  }
`;

export const ENTER_GIVEAWAY = gql`
  mutation EnterGiveaway($giveaway: Int!) {
    insert_giveaways_participants_one(object: { giveaway: $giveaway }) {
      id
      giveaway
      user
      created_at
      updated_at
    }
  }
`;

export const SERVER_ALL_GIVEAWAY = gql`
  query OpenGiveaway($date: date) {
    giveaways_giveaway(
      where: { _and: [{ ended: { _eq: false } }, { ends_at: { _lte: $date } }] }
    ) {
      id
      name
      description
      ended
      ends_at
      created_at
      updated_at
      participants {
        id
        user
      }
      prizes {
        id
        owner
      }
    }
  }
`;

export const SERVER_UPDATE_PRIZE = gql`
  mutation UpdatePrize($prize: Int!, $user: Int!) {
    update_giveaways_prize_by_pk(
      pk_columns: { id: $prize }
      _set: { owner: $user }
    ) {
      id
      owner
    }
  }
`;

export const SERVER_CLOSE_GIVEAWAY = gql`
  mutation UpdatePrize($giveaway: Int!) {
    update_giveaways_giveaway_by_pk(
      pk_columns: { id: $giveaway }
      _set: { ended: true }
    ) {
      id
      ended
    }
  }
`;
