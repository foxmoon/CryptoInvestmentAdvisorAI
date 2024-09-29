import { SessionProvider } from "next-auth/react";
import { WagmiProviderComp } from '../components/WagmiProvider';
import { cookieToInitialState } from "wagmi";
import { config } from "../utils/web3Config";
import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <WagmiProviderComp>
        <Component {...pageProps} />
      </WagmiProviderComp>
    </SessionProvider>
  );
}

export default MyApp;
/*import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp*/