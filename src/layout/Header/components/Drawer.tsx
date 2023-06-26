import {Box, Typography, Divider} from "@mui/material";
import SidebarList from "../../Sidebar/components/SidebarList";

interface DrawerProps {
  handleDrawerToggle: () => void;
}
export default function Drawer({handleDrawerToggle}: DrawerProps) {
  return (
    <Box onClick={handleDrawerToggle} sx={{textAlign: "center"}}>
      <Typography variant="h6" sx={{my: 2}}>
        PSC Management
      </Typography>
      <Divider />
      <SidebarList />
    </Box>
  );
}
