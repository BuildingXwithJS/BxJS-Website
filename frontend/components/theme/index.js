import { useDarkMode } from 'next-dark-mode';
import { useCallback } from 'react';

export const useTheme = () => {
  const { darkModeActive, switchToDarkMode, switchToLightMode } = useDarkMode();

  const toggleTheme = useCallback(() => {
    if (darkModeActive) {
      document.documentElement.classList.remove('dark');
      switchToLightMode();
    } else {
      document.documentElement.classList.add('dark');
      switchToDarkMode();
    }
  }, [darkModeActive, switchToDarkMode, switchToLightMode]);

  return { toggleTheme, isDark: darkModeActive };
};
