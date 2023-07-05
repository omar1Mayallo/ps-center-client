import DeleteIcon from "@mui/icons-material/Delete";
import {Alert, Box, Button, CircularProgress, Grid} from "@mui/material";
import GridListSkeleton from "../../shared/components/Loader/GridSkeleton";
import useUserRole from "../../shared/hooks/useUserRole";
import SessionItem from "./components/SessionItem";
import useDeleteAllSessions from "./services/deleteAllSessions";
import useGetAllSessions from "./services/getAllSessions";

export default function Sessions() {
  const {isOwner} = useUserRole();
  // HANDLE_GET_ALL_Sessions
  const {data, isLoading, isError, error} = useGetAllSessions();

  // HANDLE_DELETE_ALL_Sessions
  const {mutate, isLoading: isDeleteLoading} = useDeleteAllSessions();

  if (isError) {
    return (
      <Alert variant="filled" color="error">
        {error?.message}
      </Alert>
    );
  }

  return (
    <Box component={"section"}>
      {/* DELETE_ALL */}
      {isOwner && data && data.data.docs.length > 0 && (
        <Box textAlign={"end"} mb={2}>
          <Button
            variant="outlined"
            color="error"
            disabled={isDeleteLoading}
            startIcon={
              isDeleteLoading ? (
                <CircularProgress color="inherit" size={15} />
              ) : (
                <DeleteIcon />
              )
            }
            sx={{ml: 1}}
            onClick={() => mutate()}
          >
            {isDeleteLoading ? "Deleting" : "Delete All"}
          </Button>
        </Box>
      )}
      {/* SESSIONS */}
      <Grid container spacing={2}>
        {isLoading ? (
          <GridListSkeleton numOfItems={3} xs={12} sm={6} lg={4} />
        ) : data.data.docs.length > 0 ? (
          data.data.docs.map((item, idx) => (
            <Grid item xs={12} sm={6} lg={4} key={idx}>
              <SessionItem item={item} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Alert variant="outlined" color="warning" severity="info">
              No Sessions Added Yet
            </Alert>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
