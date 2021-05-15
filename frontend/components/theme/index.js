import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

const localStorageKey = 'BxJSCurrentTheme';
const ThemeContext = createContext('light');

export const themeStyles = {
  dark: {
    headerBg: 'bg-gray-800',
    headerText: 'text-gray-400',
    pageBg: 'bg-gray-900',
    bgHover: 'bg-gray-900 hover:bg-gray-900',
    text: 'text-gray-400',
    searchInput: 'text-gray-400 bg-gray-900',
    searchResult: 'bg-gray-800',
    searchResultTitle: 'text-gray-500',
    linkColor: 'text-blue-500',
  },
  light: {
    headerBg: 'bg-yellow-600',
    headerText: 'text-white',
    pageBg: 'bg-white',
    bgHover: 'bg-white-900 hover:bg-white-900',
    text: 'text-black',
    searchInput: 'border text-gray-700',
    searchResult: 'bg-gray-100',
    searchResultTitle: 'text-gray-900',
    linkColor: 'text-blue-700',
  },
};

export function ThemeWrapper({ children }) {
  const [theme, setTheme] = useState(() => {
    // if not running in the browser - exit
    if (typeof window !== 'object') {
      return 'dark';
    }

    // if have user-defined value locally - use it
    const themeValue = window.localStorage.getItem(localStorageKey);
    if (themeValue !== null) {
      return themeValue;
    }

    // otherwise - use system default preference
    if (window.matchMedia?.('(prefers-color-scheme: dark)')?.matches) {
      return 'dark';
    }

    return 'dark';
  });

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const [theme, setThemeValue] = useContext(ThemeContext);

  const setTheme = useCallback(
    (value) => {
      // validate theme in case we get weird values from user storage
      const newTheme = ['light', 'dark'].includes(value) ? value : 'light';
      window.localStorage.setItem(localStorageKey, newTheme);
      setThemeValue(newTheme);
    },
    [setThemeValue]
  );

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }, [theme, setTheme]);

  useEffect(() => {
    // if not running in the browser - exit
    if (typeof window !== 'object') {
      return;
    }

    // handle theme change
    const handleThemeChange = (e) => setTheme(e.matches ? 'dark' : 'light');

    // listen to change
    const matchDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');
    matchDarkTheme.addEventListener('change', handleThemeChange);

    return () =>
      matchDarkTheme.removeEventListener('change', handleThemeChange);
  }, [setTheme]);

  return { theme, toggleTheme };
};
