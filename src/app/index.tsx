import {RouterProvider} from "react-router-dom";
import router from "../routes";
import {useLoggedUser} from "./store/auth";
import ThemeProvider from "./theme";

function App() {
  useLoggedUser();

  return (
    <>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
