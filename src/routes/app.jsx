import DashboardPage from "views/Dashboard/Dashboard.jsx";
import LocationsMap from "views/Maps/LocationsMap.jsx";
import Login from '../containers/App/login'
import {
  Dashboard,
  LocationOn,
  Videocam,
  Mood,
  People,
  ExitToApp,
  Settings
} from "material-ui-icons";

const appRoutes = [
  {
    path: "/estadisticas",
    sidebarName: "Estadisticas",
    navbarName: "Estadisticas y Reportes",
    icon: Dashboard,
    component: DashboardPage,
    private: true
  },
  {
    path: "/maps",
    sidebarName: "Operaciones",
    navbarName: "Modulo de Gestion de Operaciones",
    icon: LocationOn,
    component: LocationsMap,
    private: true
  },
  {
    path: "/seguimiento",
    sidebarName: "Seguimiento vehicular",
    navbarName: "Modulo de Seguimiento vehicular",
    icon: Videocam,
    component: DashboardPage,
    private: true
  },
  {
    path: "/conductores",
    sidebarName: "Conductores",
    navbarName: "Modulo de Gestion de conductores",
    icon: People,
    component: DashboardPage,
    private: true
  },
  {
    path: "/pasajeros",
    sidebarName: "Pasajeros",
    navbarName: "Modulo de atencion al cliente",
    icon: Mood,
    component: DashboardPage,
    private: true
  },
  {
    path: "/administracion",
    sidebarName: "Administracion ",
    navbarName: "Administracion de la Plataforma",
    icon: Settings,
    component: DashboardPage,
    private: true
  },
  {
    path: "/login",
    sidebarName: "Desconectarse",
    navbarName: "Desconectarse",
    icon: ExitToApp,
    component: Login,
    private: false
  },
  //
  { redirect: true, path: "/", to: "/estadisticas", navbarName: "Redirect" }
];

export default appRoutes;
