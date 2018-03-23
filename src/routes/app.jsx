import DashboardPage from "views/Dashboard/Dashboard.jsx";
import LocationsMap from "views/Maps/LocationsMap.jsx";

import {
  Dashboard,
  LocationOn,
} from "material-ui-icons";

const appRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Material Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/maps",
    sidebarName: "Rastreo",
    navbarName: "Rastreo Vehicular",
    icon: LocationOn,
    component: LocationsMap
  },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default appRoutes;
