import darkmodejs from '@assortment/darkmodejs';
import { setCookie } from 'nookies';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

export const ThemeContext = createContext('theme');

export const ThemeProvider = ({ children, defaultValue }) => {
  const [isDark, setIsDark] = useState(defaultValue);

  const setDark = useCallback((isDark) => {
    setCookie(null, 'theme', isDark ? 'dark' : 'light', { sameSite: 'lax' });
    setIsDark(isDark);
  }, []);

  useEffect(() => {
    // only detect mode if user has not explicitly set it
    if (defaultValue !== null) {
      return;
    }

    // use darkmodejs to detect if user has dark mode by default
    const sub = darkmodejs({
      onChange: (activeTheme, themes) => {
        switch (activeTheme) {
          case themes.DARK:
            setDark(true);
            break;
          case themes.LIGHT:
            setDark(false);
            break;
        }
      },
    });

    return () => sub.removeListeners();
  }, []);

  return (
    <ThemeContext.Provider value={[isDark, setDark]}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const [isDark, setIsDark] = useContext(ThemeContext);

  const toggleTheme = useCallback(() => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  return { toggleTheme, isDark };
};
