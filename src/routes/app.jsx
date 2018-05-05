import DashboardPage from "views/Dashboard/Dashboard.jsx";
import LocationsMap from "views/Maps/LocationsMap.jsx";
import Login from '../containers/App/login'
import Monitoring from 'views/Monitoring/Monitoring'
import Mantenimiento from 'views/Mantenimiento/mantenimiento'
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
    path: "/itrack/caribetrack/app/estadisticas",
    sidebarName: "Estadisticas",
    navbarName: "Estadisticas y Reportes",
    icon: Dashboard,
    component: DashboardPage,
    private: true
  },
  {
    path: "/itrack/caribetrack/app/maps",
    sidebarName: "Operaciones",
    navbarName: "Modulo de Gestion de Operaciones",
    icon: LocationOn,
    component: LocationsMap,
    private: true
  },
  {
    path: "/itrack/caribetrack/app/seguimiento",
    sidebarName: "Seguimiento vehicular",
    navbarName: "Modulo de Seguimiento vehicular",
    icon: Videocam,
    component: Monitoring,
    private: true
  },
  {
    path: "/itrack/caribetrack/app/conductores",
    sidebarName: "Conductores",
    navbarName: "Modulo de Gestion de conductores",
    icon: People,
    component: Mantenimiento,
    private: true
  },
  {
    path: "/itrack/caribetrack/app/pasajeros",
    sidebarName: "Pasajeros",
    navbarName: "Modulo de atencion al cliente",
    icon: Mood,
    component: Mantenimiento,
    private: true
  },
  {
    path: "/itrack/caribetrack/app/administracion",
    sidebarName: "Administracion ",
    navbarName: "Administracion de la Plataforma",
    icon: Settings,
    component: Mantenimiento,
    private: true
  },
  {
    path: "/itrack/caribetrack/app/login",
    sidebarName: "Desconectarse",
    navbarName: "Desconectarse",
    icon: ExitToApp,
    component: Login,
    private: false
  },
  //
  { redirect: true, path: "/", to: "/itrack/caribetrack/app/estadisticas", navbarName: "Redirect" }
];

export default appRoutes;
