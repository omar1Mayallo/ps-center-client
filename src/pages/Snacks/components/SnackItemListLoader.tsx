import {Card, Grid, Skeleton, Stack} from "@mui/material";
import generateArrOfNum from "../../../shared/helpers/generateArrOfNum";

const SnackItemSkeleton = () => {
  return (
    <Card elevation={2} sx={{p: 3}}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Skeleton width={100} height={30} />
        <Skeleton width={70} height={30} />
      </Stack>
      <Skeleton width="100%" />
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Skeleton width={30} height={25} />
        <Skeleton width={70} height={20} />
      </Stack>
    </Card>
  );
};

export default function SnackItemListSkeleton() {
  return (
    <Grid container spacing={2} p={2}>
      {generateArrOfNum(9).map((item) => (
        <Grid item xs={12} sm={6} lg={4} key={item}>
          <SnackItemSkeleton />
        </Grid>
      ))}
    </Grid>
  );
}
