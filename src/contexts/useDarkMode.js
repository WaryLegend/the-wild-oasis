import { useContext } from "react";
import { DarKModeContext } from "./DarkModeContext";

function useDarkMode() {
  const context = useContext(DarKModeContext);
  if (context === undefined)
    throw new Error("DarkModeConText was used outside of the DarkModeProvider");
  const { isDarkMode, toggleDarkMode } = context;
  return { isDarkMode, toggleDarkMode };
}

export { useDarkMode };
