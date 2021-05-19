import { createGraphiQLFetcher } from '@graphiql/toolkit';
import GraphiQL from 'graphiql';
import 'graphiql/graphiql.min.css';
import { GRAPHQL_URL } from '../graphql/client.js';

export default function GraphqlPlayground() {
  const fetcher = process.browser
    ? createGraphiQLFetcher({
        url: GRAPHQL_URL,
      })
    : () => {};

  return <GraphiQL fetcher={fetcher} />;
}
