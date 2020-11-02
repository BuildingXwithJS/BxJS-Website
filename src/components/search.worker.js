import Fuse from 'fuse.js';

const fuseOptions = {
  shouldSort: true,
  threshold: 0.8,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ['urls', 'title'],
};

let fuse;

const init = async () => {
  const searchData = await fetch('/links.json').then(r => r.json());
  fuse = new Fuse(searchData, fuseOptions);
};

init();

export function search(input) {
  const found = fuse.search(input).map(res => res.item);
  return found;
}
