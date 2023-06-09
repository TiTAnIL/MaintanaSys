
import { Shop } from "./views/shop.jsx";
import { AlufApp } from "./views/aluf-app.jsx";

const routes = [
    {
        path: '/',
        component: <AlufApp />,
    },
    {
        path: '/shop',
        component: <Shop />
    },
]
export default routes