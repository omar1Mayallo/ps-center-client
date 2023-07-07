import {Box, Card, Grid} from "@mui/material";
import Head from "../../shared/components/Head";
import {OrderTypesPercentageItem, SessionTypesPercentageItem} from "./api";
import VerticalBarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import {
  useGetOrdersMonthlyProfit,
  useGetSessionsMonthlyProfit,
} from "./services/getMonthlyProfits";
import {
  useGetOrderTypesPercentage,
  useGetSessionTypesPercentage,
} from "./services/getPercentagesTypes";

export default function Dashboard() {
  // PERCENTAGE
  const {
    data: ordTypesData,
    isLoading: ordTypesLoading,
    error: ordTypesErr,
  } = useGetOrderTypesPercentage();
  const {
    data: sessionTypesData,
    isLoading: sessionTypesLoading,
    error: sessionTypesErr,
  } = useGetSessionTypesPercentage();

  // MONTHLY_PROFITS
  const {
    data: ordMonthlyData,
    isLoading: ordMonthlyLoading,
    error: ordMonthlyErr,
  } = useGetOrdersMonthlyProfit();
  const {
    data: sessionMonthlyData,
    isLoading: sessionMonthlyLoading,
    error: sessionMonthlyErr,
  } = useGetSessionsMonthlyProfit();

  if (
    ordTypesLoading ||
    sessionTypesLoading ||
    ordMonthlyLoading ||
    sessionMonthlyLoading
  ) {
    return <h1>ordTypesLoading</h1>;
  }

  if (ordTypesErr || sessionTypesErr || ordMonthlyErr || sessionMonthlyErr) {
    return <h1>Error</h1>;
  }
  console.log(ordMonthlyData);

  // SessionProfitItem
  return (
    <Box>
      <Head h="Dashboard" />
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card
            elevation={1}
            sx={{
              p: 2,
              maxHeight: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <VerticalBarChart dataProfits={sessionMonthlyData} />
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            elevation={1}
            sx={{
              p: 2,
              maxHeight: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PieChart<SessionTypesPercentageItem>
              dataPercentage={sessionTypesData}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card
            elevation={1}
            sx={{
              p: 2,
              maxHeight: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <VerticalBarChart dataProfits={ordMonthlyData} />
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            elevation={1}
            sx={{
              p: 2,
              maxHeight: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PieChart<OrderTypesPercentageItem> dataPercentage={ordTypesData} />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
