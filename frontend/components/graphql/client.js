import { createClient } from 'urql';

export const GRAPHQL_URL =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ??
  'http://localhost:8080/v1/graphql';

export const graphqlClient = createClient({
  url: GRAPHQL_URL,
});
