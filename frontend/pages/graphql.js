import dynamic from 'next/dynamic';
import Layout from '../components/layout/index.js';

const GraphqlPlayground = dynamic(() =>
  import('../components/graphiql/index.js')
);

export default function GraphqlPlaygroundPage() {
  return (
    <Layout>
      <h1 className="text-3xl	py-4">BxJS GraphQL Playground</h1>

      <GraphqlPlayground />
    </Layout>
  );
}
