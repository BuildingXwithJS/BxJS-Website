import { gql } from 'urql';

export const WEEKLY_EPISODES = gql`
  query GetWeeklyEpisodes {
    bxjsweekly_episodes(order_by: { date: desc }) {
      id
      name
      date
      created_at
      updated_at
    }
  }
`;

export const WEEKLY_EPISODE_BY_NAME = gql`
  query GetWeeklyEpisodeByName($name: String) {
    bxjsweekly_episodes(where: { name: { _eq: $name } }) {
      id
      name
      date
      created_at
      updated_at
      links {
        id
        episode
        created_at
        category
        title
        updated_at
        url
      }
    }
  }
`;