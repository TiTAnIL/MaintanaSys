import { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/imgs/logo.png'
import cartIcon from '../assets/imgs/shop_cart.png'
import { useSelector } from 'react-redux';

export function AppHeader() {

    // const isAuthenticated = useSelector((state) => state.authModule.isAuthenticated)
    const userAuth = useSelector((state) => state.authModule);
    const navigate = useNavigate();

    useEffect(() => {
        if (userAuth.id) {
            console.log('userauth.id', userAuth.id)
            
        }
    }, [navigate, userAuth]);


    return (
        <header className="app-header">
            <div className="header-container">
                <div className="logo-container">
                    <Link to="/">
                        <img className="logo" src={logo} alt="Logo" />
                    </Link>
                </div>
                
                <div className="shop-container">
                    <Link to={`/user/${userAuth.id}`}>
                        <button className="shop-btn">Shop</button>
                    </Link>
                </div>



                <div className="cart-container">
                    <Link to="/shoppingCart">
                        <img className="cart-icon" src={cartIcon} alt="Cart" />
                    </Link>

                </div>
            </div>
        </header>
    );
}