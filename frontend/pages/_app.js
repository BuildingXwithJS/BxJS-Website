import { Provider } from 'next-auth/client';
import { Provider as UrqlProvider } from 'urql';
import { graphqlClient } from '../components/graphql/client.js';
import '../components/styles/globals.css';
import { ThemeWrapper } from '../components/theme/index.js';

export default function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <UrqlProvider value={graphqlClient}>
        <ThemeWrapper>
          <Component {...pageProps} />
        </ThemeWrapper>
      </UrqlProvider>
    </Provider>
  );
}
