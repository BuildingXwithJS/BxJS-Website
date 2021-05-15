import { Provider } from 'next-auth/client';
import '../components/styles/globals.css';
import { ThemeWrapper } from '../components/theme/index.js';

export default function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <ThemeWrapper>
        <Component {...pageProps} />
      </ThemeWrapper>
    </Provider>
  );
}
