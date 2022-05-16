import { useWallet } from '@solana/wallet-adapter-react';
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, ButtonProps } from './Button2';
import { useWalletModal } from './useWalletModal2';
import { WalletConnectButton } from './WalletConnectButton2';
import { WalletIcon } from './WalletIcon2';
import { WalletModalButton } from './WalletModalButton2';

export const SolanaWalletButton: FC<ButtonProps> = ({ children, ...props }) => {
    
    const { publicKey, wallet, disconnect } = useWallet();
    const { setVisible } = useWalletModal();

    const [copied, setCopied] = useState(false);
    const [showQR, setShowQR] = useState(false);
    const [active, setActive] = useState(false);
    const ref = useRef<HTMLUListElement>(null);

    const urlQrCodeApi='https://api.qrserver.com/v1/create-qr-code/?data=';
    let walletAddress= undefined;

    const showImageQR(){
        setShowQR(true);
    }

    const hideImageQR(){
        setShowQR(false);
    }

    const switchStateImageQR(){
        let newValueShowQR = showQR ? false : true;
        setShowQR(showQR);
    }


    const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);
    const content = useMemo(() => {
        if (children) return children;
        if (!wallet || !base58) return null;
        return base58.slice(0, 4) + '..' + base58.slice(-4);
    }, [children, wallet, base58]);

    const copyAddress = useCallback(async () => {
        if (base58) {
            await navigator.clipboard.writeText(base58);
            setCopied(true);
            setTimeout(() => setCopied(false), 400);
        }
    }, [base58]);

    const openDropdown = useCallback(() => {
        setActive(true);
    }, []);

    const closeDropdown = useCallback(() => {
        setActive(false);
    }, []);

    const openModal = useCallback(() => {
        setVisible(true);
        closeDropdown();
    }, [closeDropdown]);

    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            const node = ref.current;

            // Do nothing if clicking dropdown or its descendants
            if (!node || node.contains(event.target as Node)) return;

            closeDropdown();
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, closeDropdown]);

    if (!wallet) return <WalletModalButton {...props}>{children}</WalletModalButton>;
    if (!base58) return <WalletConnectButton {...props}>{children}</WalletConnectButton>;

    return (
        <div className="wallet-adapter-dropdown">
            <Button
                aria-expanded={active}
                className="wallet-adapter-button-trigger far fa-wallet"
                style={{ pointerEvents: active ? 'none' : 'auto', ...props.style }}
                onClick={openDropdown}
                startIcon={<WalletIcon wallet={wallet} />}
                {...props}
            >
                {content}
            </Button>
            <ul
                aria-label="dropdown-list"
                className={`wallet-adapter-dropdown-list ${active && 'wallet-adapter-dropdown-list-active'}`}
                ref={ref}
                role="menu"
            >
                <li onClick={copyAddress} className="wallet-adapter-dropdown-list-item" role="menuitem">
                    {copied ? 'Copied' : 'Copy address'}
                </li>
                <li onClick={openModal} className="wallet-adapter-dropdown-list-item" role="menuitem">
                    Change wallet
                </li>
                <li onClick={disconnect} className="wallet-adapter-dropdown-list-item" role="menuitem">
                    Disconnect
                </li>
            </ul>
            <div  aria-label="dropdown-list"
                  className={`wallet-adapter-dropdown-list ${active && 'wallet-adapter-dropdown-list-active'}`}
                  ref={ref}
                  role="menu">

                  <button className="fa-light fa-copy" onClick={copyAddress} ></button>
                  <button className="fa-light fa-qrcode" ></button>
                  <button className="far fa-wallet ms-3" onClick={openModal} ></button>
                  <button className="fa-regular fa-arrow-right-from-bracket" onClick={disconnect} ></button>

                  <div id="qr-info"> 
                    codigo QR
                    <img src={urlQrCodeApi+base58} >
                  </div>

            </div>
        </div>
    );
};

