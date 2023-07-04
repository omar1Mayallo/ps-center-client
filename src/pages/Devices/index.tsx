import AddIcon from "@mui/icons-material/Add";
import {Alert, Box, Button, Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";
import useUserRole from "../../shared/hooks/useUserRole";
import useGetAllDevices from "./services/getAllDevices";
import GridListSkeleton from "../../shared/components/Loader/GridSkeleton";
import DeviceItem from "./components/DeviceItem";

export default function Devices() {
  const navigate = useNavigate();
  const {isOwner} = useUserRole();

  // HANDLE_GET_ALL_SNACKS
  const {data, isLoading, isError, error} = useGetAllDevices();

  if (isError) {
    return (
      <Alert variant="filled" color="error">
        {error?.message}
      </Alert>
    );
  }

  console.log(data?.data.docs);

  return (
    <Box component={"section"}>
      {/* CREATE_DEVICE */}
      {isOwner && (
        <Box textAlign={"end"} mb={2}>
          <Button
            variant="outlined"
            onClick={() => navigate("/snacks/create")}
            startIcon={<AddIcon />}
          >
            Add New
          </Button>
        </Box>
      )}

      <Grid container spacing={2}>
        {isLoading ? (
          <GridListSkeleton numOfItems={6} xs={12} sm={6} lg={4} />
        ) : data.data.docs.length > 0 ? (
          data.data.docs.map((item, idx) => (
            <Grid item xs={12} md={6} lg={4} key={idx}>
              <DeviceItem item={item} />
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
