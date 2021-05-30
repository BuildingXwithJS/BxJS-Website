import { getSession, Provider } from 'next-auth/client';
import withDarkMode from 'next-dark-mode';
import App from 'next/app';
import Head from 'next/head';
import { useMemo } from 'react';
import { Provider as UrqlProvider } from 'urql';
import { createGraphqlClientWithToken } from '../components/graphql/client.js';
import '../components/styles/globals.css';

function MyApp({ Component, pageProps, token, darkMode }) {
  const graphqlClient = useMemo(() => createGraphqlClientWithToken(token), [
    token,
  ]);

  const isDark = darkMode.darkModeActive;

  return (
    <>
      {isDark && (
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `document.documentElement.classList.add("dark");`,
            }}
          />
        </Head>
      )}
      <Provider session={pageProps.session}>
        <UrqlProvider value={graphqlClient}>
          <Component {...pageProps} />
        </UrqlProvider>
      </Provider>
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  const session = await getSession(appContext);

  return { ...appProps, token: session?.token };
};

export default withDarkMode(MyApp);
