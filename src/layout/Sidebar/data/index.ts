import DevicesIcon from "@mui/icons-material/Devices";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import TapasIcon from "@mui/icons-material/Tapas";
import LogoutIcon from "@mui/icons-material/Logout";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import SvgIcon from "@mui/material/SvgIcon";

export interface NavItem {
  navItem: string;
  NavIcon: typeof SvgIcon;
  navUrl?: string;
}
export const navItems: NavItem[] = [
  {navItem: "Devices", NavIcon: DevicesIcon, navUrl: "/"},
  {navItem: "Sessions", NavIcon: SportsEsportsIcon, navUrl: "/sessions"},
  {navItem: "Orders", NavIcon: ViewModuleIcon, navUrl: "/orders"},
  {navItem: "Snacks", NavIcon: TapasIcon, navUrl: "/snacks"},
  {navItem: "Users", NavIcon: PeopleAltIcon, navUrl: "/users"},
  {navItem: "Logout", NavIcon: LogoutIcon},
];
