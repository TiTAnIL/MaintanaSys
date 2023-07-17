
import { SiteManagement } from "./views/site-management.jsx";
import { AlufApp } from "./views/aluf-app.jsx";
import { ShoppingCart } from "./views/shoping-cart.jsx";

const routes = [
    {
        path: '/',
        component: <AlufApp />,
    },
    {
        path: '/sitemanagment/:id',
        component: <SiteManagement />
    },
    {
        path: '/shoppingCart',
        component: <ShoppingCart />,
    }
]
export default routes