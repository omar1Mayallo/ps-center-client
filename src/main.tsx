import React from "react";
import ReactDOM from "react-dom/client";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {SnackbarProvider} from "notistack";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import App from "./app";
import "./index.css";

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider preventDuplicate autoHideDuration={2000} maxSnack={3}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </SnackbarProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
