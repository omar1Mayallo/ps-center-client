import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {Alert, Box, Button, CircularProgress, Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";
import GridListSkeleton from "../../shared/components/Loader/GridSkeleton";
import useUserRole from "../../shared/hooks/useUserRole";
import OrderCard from "./components/OrderCard";
import useDeleteAllOrders from "./services/deleteAllOrders";
import useGetAllOrders from "./services/getAllOrders";

export default function Orders() {
  const navigate = useNavigate();
  const {isOwner} = useUserRole();
  // HANDLE_GET_ALL_ORDERS
  const {data, isLoading, isError, error} = useGetAllOrders();

  // HANDLE_DELETE_ALL_ORDERS
  const {mutate, isLoading: isDeleteLoading} = useDeleteAllOrders();

  if (isError) {
    return (
      <Alert variant="filled" color="error">
        {error?.message}
      </Alert>
    );
  }

  return (
    <Box component={"section"}>
      <Box textAlign={"end"} mb={2}>
        <Button
          variant="outlined"
          onClick={() => navigate("/snacks/create")}
          startIcon={<AddIcon />}
        >
          Add New
        </Button>
        {isOwner && (
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
        )}
      </Box>
      <Grid container spacing={2}>
        {isLoading ? (
          <GridListSkeleton numOfItems={4} xs={12} sm={12} lg={6} />
        ) : data.data.docs.length > 0 ? (
          data.data.docs.map((item, idx) => (
            <Grid item xs={12} lg={6} key={idx}>
              <OrderCard item={item} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Alert variant="outlined" color="warning" severity="info">
              No Orders Added Yet
            </Alert>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
