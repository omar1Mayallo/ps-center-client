import {Alert, Box, Grid} from "@mui/material";
import SnackItemListSkeleton from "./components/Skeleton";
import SnackItem from "./components/SnackItem";
import useGetAllSnacks from "./services/getAllSnacks";

export default function Snacks() {
  // HANDLE_GET_ALL_SNACKS
  const {data, isLoading, isError, error} = useGetAllSnacks();

  if (isError) {
    return (
      <Alert variant="filled" color="error">
        {error?.message}
      </Alert>
    );
  }

  return (
    <Box component={"section"}>
      <Grid container spacing={2}>
        {isLoading ? (
          <SnackItemListSkeleton />
        ) : (
          data.data.docs.map((item, idx) => (
            <Grid item xs={12} sm={6} lg={4} key={idx}>
              <SnackItem {...item} />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}
