import { useCallback, useEffect, useState } from 'react';

const isThemeDark = () =>
  typeof window !== 'undefined' &&
  (window.localStorage.theme === 'dark' ||
    (!('theme' in window.localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches));

export const useTheme = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = useCallback(() => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      window.localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      window.localStorage.theme = 'dark';
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    // if not running in the browser - exit
    if (typeof window !== 'object') {
      return;
    }

    // On page load - change to user preferred theme
    if (isThemeDark()) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return { toggleTheme, isDark };
};
