import { gql, GraphQLClient } from "graphql-request";

const endpoint =
  process.env.HASURA_ENDPOINT ?? "http://localhost:8080/v1/graphql";
const adminSecret = process.env.HASURA_SECRET ?? "localadminsecret";

export const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    "x-hasura-admin-secret": adminSecret,
  },
});

export const BATCH_INSERT_EPISODES = gql`
  mutation InsertEpisode($episodes: [bxjsweekly_episodes_insert_input!]!) {
    insert_bxjsweekly_episodes(objects: $episodes) {
      affected_rows
      returning {
        id
        date
        name
        created_at
        updated_at
      }
    }
  }
`;

export const BATCH_INSERT_LINKS = gql`
  mutation InsertLinks($links: [bxjsweekly_links_insert_input!]!) {
    insert_bxjsweekly_links(objects: $links) {
      affected_rows
      returning {
        id
        category
        title
        url
        episode
        created_at
        updated_at
      }
    }
  }
`;
