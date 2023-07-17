import { Link } from 'react-router-dom';
import logo from '../assets/imgs/logo.png'
import cartIcon from '../assets/imgs/shop_cart.png'

export function AppHeader() {

    // const isAuthenticated = useSelector((state) => state.authModule.isAuthenticated)


    return (
        <header className="app-header">
            <div className="header-container">
                <div className="logo-container">
                    <Link to="/">
                        <img className="logo" src={logo} alt="Logo" />
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