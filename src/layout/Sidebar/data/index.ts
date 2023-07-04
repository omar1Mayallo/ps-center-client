import DevicesIcon from "@mui/icons-material/Devices";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import TapasIcon from "@mui/icons-material/Tapas";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import SvgIcon from "@mui/material/SvgIcon";

export interface NavItem {
  navItem: string;
  NavIcon: typeof SvgIcon;
  navUrl?: string;
  isAuthorizedTo?: string | string[];
}
export const navItems: NavItem[] = [
  {navItem: "Devices", NavIcon: DevicesIcon, navUrl: "/"},
  {
    navItem: "Sessions",
    NavIcon: SportsEsportsIcon,
    navUrl: "/sessions",
    isAuthorizedTo: ["ADMIN", "OWNER"],
  },
  {
    navItem: "Orders",
    NavIcon: ViewModuleIcon,
    navUrl: "/orders",
    isAuthorizedTo: ["ADMIN", "OWNER"],
  },
  {
    navItem: "Snacks",
    NavIcon: TapasIcon,
    navUrl: "/snacks",
    isAuthorizedTo: ["ADMIN", "OWNER"],
  },
  {
    navItem: "Users",
    NavIcon: PeopleAltIcon,
    navUrl: "/users",
    isAuthorizedTo: ["ADMIN", "OWNER"],
  },
];
