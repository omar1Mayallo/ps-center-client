import {create} from "zustand";

interface ColorModeState {
  mode: "dark" | "light";
  toggleColorMode: () => void;
}
export const useColorModeStore = create<ColorModeState>((set) => ({
  mode: "light",
  toggleColorMode: () => {
    set((state) => ({
      mode: state.mode === "light" ? "dark" : "light",
    }));
  },
}));
