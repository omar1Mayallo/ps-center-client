import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {enqueueSnackbar} from "notistack";
import React from "react";
import useSnacksServices from "../../../pages/Snacks/services";
import catchAndNotifyErrors from "../../helpers/catchAndNotifyErrors";

export default function MutationMenu({id}: {id: string}) {
  const theme = useTheme();
  // TOGGLE_MENU_HANDLER
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // DELETE_SNACK_HANDLER
  const {deleteSnack} = useSnacksServices();
  const queryClient = useQueryClient();
  const {mutate, isLoading} = useMutation({
    mutationFn: (id: string) => deleteSnack(id),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({queryKey: ["snacks"]});
    },
    onError: catchAndNotifyErrors,
  });

  // TODO
  // EDIT_SNACK_HANDLER

  return (
    <Box>
      {isLoading ? (
        <CircularProgress size={25} />
      ) : (
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
      )}

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
        <MenuItem
          onClick={() => enqueueSnackbar("That was easy!")}
          disableRipple
        >
          <EditIcon sx={{mr: 1.5}} />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            mutate(id);
            handleClose();
          }}
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
