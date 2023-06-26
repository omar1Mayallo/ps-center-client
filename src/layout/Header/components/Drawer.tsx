import {Box, Divider} from "@mui/material";
import SidebarList from "../../Sidebar/components/SidebarList";
import LogoText from "../../Footer/LogoText";

interface DrawerProps {
  handleDrawerToggle: () => void;
}
export default function Drawer({handleDrawerToggle}: DrawerProps) {
  return (
    <Box onClick={handleDrawerToggle} sx={{textAlign: "center"}}>
      <LogoText my={2} />
      <Divider />
      <SidebarList />
    </Box>
  );
}
