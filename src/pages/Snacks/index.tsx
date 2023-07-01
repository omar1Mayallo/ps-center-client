import {Alert, Box, Grid} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import api, {ResErrorsI} from "../../api";
import useAuthStore from "../../app/store/auth";
import SnackItem, {SnackItemI} from "./components/SnackItem";
import SnackItemListSkeleton from "./components/SnackItemListLoader";

export default function Snacks() {
  const {user} = useAuthStore();

  // GET_SNACKS
  async function getSnacks() {
    const {data} = await api.get("/snacks", {
      headers: {
        Authorization: "Bearer " + user,
      },
    });
    return data.data.docs as SnackItemI[];
  }
  const {data, isLoading, isError, error} = useQuery<
    SnackItemI[],
    AxiosError<ResErrorsI>
  >({
    queryKey: ["snacks"],
    queryFn: getSnacks,
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
          data.map((item, idx) => (
            <Grid item xs={12} sm={6} lg={4} key={idx}>
              <SnackItem {...item} />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}
