import List from "@mui/material/List";

import {navItems} from "../data";
import NavListItem from "./NavListItem";

export default function SidebarList() {
  return (
    <List>
      {navItems.map(({navItem, navUrl, NavIcon}, idx) => (
        <NavListItem
          key={idx}
          navItem={navItem}
          navUrl={navUrl}
          NavIcon={NavIcon}
        />
      ))}
    </List>
  );
}
