import {ReactNode, useMemo} from "react";
import {
  createTheme,
  ThemeProvider as ColorThemeProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {useColorModeStore} from "./store/theme";

interface ThemeProviderProps {
  children: ReactNode;
}
export default function ThemeProvider({children}: ThemeProviderProps) {
  const {mode} = useColorModeStore();
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ColorThemeProvider>
  );
}
