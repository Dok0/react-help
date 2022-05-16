
// import 'swiper/swiper.min.css';
// import { React , useEffect} from 'react';
import { React, useEffect, FC, useMemo  } from 'react';


import './components/solana/button-wallet-connect/styles.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import AOS from 'aos';

import { Route , Routes } from 'react-router-dom';

import { clusterApiUrl } from '@solana/web3.js';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    GlowWalletAdapter,
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';

import routes from './pages/index'

import { SolanaWalletButton, WalletModalProvider2 } from './components/solana/button-wallet-connect';


const App: FC = () => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // of wallets that your users connect to will be loaded.
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new LedgerWalletAdapter(),
            new GlowWalletAdapter(),
            new SlopeWalletAdapter(),
            new SolflareWalletAdapter({ network }),
        ],
        [network]
    );

    useEffect(() => {
        AOS.init({
          duration : 2000
        });
      }, []);
    return (
        <>
<ConnectionProvider endpoint={endpoint}>
    <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
            <WalletMultiButton />
            <SolanaWalletButton />

                    { /* Your app's components go here, nested within the context providers. */ }


            <Routes >
                {
                routes.map((data,index) => (
                    <Route exact={true} path={data.path} element={data.component} key={'app-'+index} />
                ))
                }
            </Routes>


        </WalletModalProvider>
    </WalletProvider>
</ConnectionProvider>
        </>
    );
}

export default App;
