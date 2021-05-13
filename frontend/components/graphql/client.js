import { createClient } from 'urql';

export const graphqlClient = createClient({
  url:
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ??
    'http://localhost:8080/v1/graphql',
});
