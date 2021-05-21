import { createClient } from 'urql';

export const GRAPHQL_URL =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ??
  'http://localhost:8080/v1/graphql';

export const graphqlClient = createClient({
  url: GRAPHQL_URL,
});

export const createGraphqlClientWithToken = (token) =>
  createClient({
    url: GRAPHQL_URL,
    fetchOptions: () => ({
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }),
  });

export const createGraphqlClientWithAdminSecret = (secret) =>
  createClient({
    url: GRAPHQL_URL,
    fetchOptions: () => ({
      headers: { 'X-Hasura-Admin-Secret': secret },
    }),
  });
