import React , { useEffect , useState } from 'react';

import { Link , useLocation } from "react-router-dom";

import menus from "../../pages/menuonepage";
import logo from '../../assets/data/logo';

  
const HeaderOnePage = () => {
    const getWalletShortAddress = () => {
        let dataShow = "wallet number";//wallet.slice(0, 7) + '...' + wallet.substring(wallet.length-5)
        return dataShow;
    }

    const disconnectWallet = () => {
        console.log('disconnectWallet');
        let walletInfo = undefined;
    }


    const { pathname } = useLocation();

    const [scroll, setScroll] = useState(false);
        useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 100);
        });
        return () => {
            setScroll({});
        }
    }, []);


    const [menuActive, setMenuActive] = useState(null);

    const handleMenuActive = () => {
        setMenuActive(!menuActive);
      };

    
    const [activeIndex, setActiveIndex] = useState(null);
    const handleDropdown = index => {
        setActiveIndex(index); 
    };

    return (
        <header id="header_main" className={`header js-header ${scroll ? 'is-fixed' : ''}`}>
            <div className="container-fluid">
                        <div className="header__body d-flex justify-content-between">
                                <div className="header__logo">
                                    <Link to="/">
                                        <img id="site-logo" src={logo} alt="Monteno"  />
                                    </Link>
                                </div>
                                <div className="header__right">
                                    
                                    <nav id="main-nav" className={`main-nav ${menuActive ? 'active' : ''}`}>
                                        <ul id="menu-primary-menu" className="menu">
                                            {
                                                menus.map((data,index) => (
                                                    <li key={'menu-'+ index} onClick={()=> handleDropdown(index)} 
                                                    className={`menu-item ${data.namesub ? 'menu-item-has-children' : '' } 
                                                        ${activeIndex === index ? 'active' : ''} ${pathname === data.links ? 'active' : ''} ` }   >
                                                        <a href={data.links}>{data.name}</a>
                                                    </li>
                                                ))
                                            }
                                            <li key={'user-wallet-install-' + 'status'} className="menu-item">
                                                    <button className="walletButton" onClick={() => disconnectWallet()}>{ getWalletShortAddress() }</button>    
                                            </li>

                                        </ul>
                                    </nav>

                                    <div className={`mobile-button ${menuActive ? 'active' : ''}`} onClick={handleMenuActive}><span></span></div>
                                    <ul className="social">
                                      <li data-aos="fade-up" data-aos-duration="1000"><Link to="https://discord.gg/KqX2Bb5gnB"><i className="fab fa-discord"></i></Link></li>
                                      <li data-aos="fade-up" data-aos-duration="1200"><Link to="https://twitter.com/HandiHeroes"><i className="fab fa-twitter"></i></Link></li>
                                    </ul>
                                </div>

                        </div>
            </div>
        </header>
    );
}

export default HeaderOnePage;
