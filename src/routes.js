
import { SiteManagement } from "./views/site-management.jsx";
import { AlufApp } from "./views/aluf-app.jsx";

const routes = [
    {
        path: '/',
        component: <AlufApp />,
    },
    {
        path: '/sitemanagment/:id',
        component: <SiteManagement />
    },
    // {
        // path: '/user/:userId/site/:siteId',
        // component: <sites />,
    //   }
]
export default routes