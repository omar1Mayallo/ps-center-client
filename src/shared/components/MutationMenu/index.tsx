import MoreVertIcon from "@mui/icons-material/MoreVert";
import {Box, IconButton, Menu, MenuItem, useTheme} from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function MutationMenu() {
  const theme = useTheme();
  // TOGGLE_MENU_HANDLER
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      <IconButton
        size="small"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disableRipple>
          <EditIcon sx={{mr: 1.5}} />
          Edit
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          disableRipple
          sx={{color: theme.palette.error.main}}
        >
          <DeleteIcon sx={{mr: 1.5}} />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
}
