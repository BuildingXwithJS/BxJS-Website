import { getSession, SessionProvider } from 'next-auth/react';
import App from 'next/app';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import { useMemo } from 'react';
import { Provider as UrqlProvider } from 'urql';
import { createGraphqlClientWithToken } from '../components/graphql/client.js';
import '../components/styles/globals.css';
import { ThemeProvider } from '../components/theme/index.js';

function MyApp({ Component, pageProps, token, isDark }) {
  const graphqlClient = useMemo(() => createGraphqlClientWithToken(token), [
    token,
  ]);

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
      <ThemeProvider defaultValue={isDark}>
        <SessionProvider session={pageProps.session}>
          <UrqlProvider value={graphqlClient}>
            <Component {...pageProps} />
          </UrqlProvider>
        </SessionProvider>
      </ThemeProvider>
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  const session = await getSession(appContext);

  // dark mode pre-render
  const cookies = parseCookies(appContext.ctx);
  const darkMode = cookies.theme ? cookies.theme === 'dark' : null;

  return { ...appProps, token: session?.token, isDark: darkMode };
};

export default MyApp;
