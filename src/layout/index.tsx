import {Outlet} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import {Container, Grid, Theme, useMediaQuery} from "@mui/material";
import Sidebar from "./Sidebar";

export default function Layout() {
  const isLargeScreen: boolean = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.up("md")
  );

  return (
    <>
      <Header />
      <Container maxWidth="xl">
        {isLargeScreen ? (
          <Grid container spacing={2}>
            <Grid item lg={2}>
              <Sidebar />
            </Grid>
            <Grid item lg={10}>
              <main>
                <Outlet />
              </main>
            </Grid>
          </Grid>
        ) : (
          <main>
            <Outlet />
          </main>
        )}
      </Container>
      <Footer />
    </>
  );
}
