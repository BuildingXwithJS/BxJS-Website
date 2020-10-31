const localStorageKey = 'DarkThemeIsEnabled';

let isEnabled = null;
if (typeof window === 'object') {
  isEnabled = localStorage.getItem(localStorageKey);
  if (isEnabled !== null) {
    isEnabled = JSON.parse(isEnabled);
  } else if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    isEnabled = true;
  } else {
    isEnabled = false;
  }
}

const DarkTheme = {
  isEnabled: isEnabled,
  subscribers: [],
  subscribe(fn) {
    this.subscribers.push(fn);
  },
  next(v) {
    this.subscribers.forEach(fn => fn(v));
  },
};

typeof window === 'object' &&
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', e => {
      DarkTheme.next(!!e.matches);
    });

DarkTheme.subscribe(isEnabled => {
  DarkTheme.isEnabled = isEnabled;
  typeof window === 'object' &&
    localStorage.setItem(localStorageKey, JSON.stringify(DarkTheme.isEnabled));
});

export { DarkTheme };
