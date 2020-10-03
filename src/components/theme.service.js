const localStorageKey = 'DarkThemeIsEnabled';
const DarkTheme = {
  isEnabled:
    (typeof window === 'object' &&
      JSON.parse(localStorage.getItem(localStorageKey))) ||
    false,
  subscribers: [],
  subscribe(fn) {
    this.subscribers.push(fn);
  },
  next(v) {
    this.subscribers.forEach(fn => fn(v));
  },
};
DarkTheme.subscribe(isEnabled => {
  DarkTheme.isEnabled = isEnabled;
  typeof window === 'object' &&
    localStorage.setItem(localStorageKey, JSON.stringify(DarkTheme.isEnabled));
});

export { DarkTheme };
