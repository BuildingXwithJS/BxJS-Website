import { getSession, Provider } from 'next-auth/client';
import App from 'next/app';
import { useMemo } from 'react';
import { Provider as UrqlProvider } from 'urql';
import { createGraphqlClientWithToken } from '../components/graphql/client.js';
import '../components/styles/globals.css';

function MyApp({ Component, pageProps, token }) {
  const graphqlClient = useMemo(() => createGraphqlClientWithToken(token), [
    token,
  ]);

  return (
    <Provider session={pageProps.session}>
      <UrqlProvider value={graphqlClient}>
        <Component {...pageProps} />
      </UrqlProvider>
    </Provider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  const session = await getSession(appContext);

  return { ...appProps, token: session?.token };
};

export default MyApp;
