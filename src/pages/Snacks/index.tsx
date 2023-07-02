import {Alert, Box, Grid} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {ResErrorsI} from "../../api";
import Snack from "../../entities/Snack";
import {GetAllResI} from "../../shared/types/APITypes";
import SnackItemListSkeleton from "./components/Skeleton";
import SnackItem from "./components/SnackItem";
import useSnacksServices from "./services";

export default function Snacks() {
  // HANDLE_GET_ALL_SNACKS
  const {getAllSnacks} = useSnacksServices();
  const {data, isLoading, isError, error} = useQuery<
    GetAllResI<Snack>,
    AxiosError<ResErrorsI>
  >({
    queryKey: ["snacks"],
    queryFn: getAllSnacks,
  });
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
