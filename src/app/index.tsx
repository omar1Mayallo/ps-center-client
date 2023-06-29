import {RouterProvider} from "react-router-dom";
import router from "../routes";
import ThemeProvider from "./theme";
import useAuthStore from "./store/auth";

function App() {
  const {user} = useAuthStore();

  return (
    <>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
