import { Link } from 'gatsby';
import React, { useRef, useState } from 'react';
import Loader from './loader';
import SearchWorker from './search.worker.js';
import { themeStyles, useTheme } from './theme';

const searchWorker = typeof window === 'object' && new SearchWorker();

const getResults = async input => {
  const results = await searchWorker.search(input);
  return results;
};

function Search() {
  const { theme } = useTheme();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef();

  const handleSearch = e => {
    const input = e.target.value;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (input.length === 0) {
      setResults([]);
      return;
    }

    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      const found = await getResults(input);
      setResults(found);
      setLoading(false);
    }, 750);
  };

  return (
    <>
      {loading && <Loader />}
      <div className="mt-3 md:mt-0">
        <input
          className={`${themeStyles[theme].searchInput} shadow appearance-none rounded-full w-full py-2 px-3 text-sm leading-tight focus:outline-none focus:shadow-outline`}
          id="search"
          type="text"
          placeholder="Search.."
          onChange={handleSearch}
        />

        <div className="search-results w-11/12 md:w-1/3 mt-10 md:mt-8">
          {results.slice(0, 10).map(it => (
            <div
              className={`${themeStyles[theme].searchResult} mx-auto flex p-6 m-2 rounded-lg shadow-lg mr-2`}
              key={it.urls}
            >
              <div className="flex flex-col flex-1">
                <a href={it.urls} target="_blank" rel="noopener noreferrer">
                  <h4
                    className={`${themeStyles[theme].searchResultTitle} text-xl leading-tight`}
                  >
                    {it.title}
                  </h4>
                </a>
                <p className="text-sm text-gray-600 leading-normal">
                  {it.category}
                </p>
              </div>
              <Link
                to={it.episodeUrl}
                className="flex items-center text-sm text-gray-600 pl-1"
              >
                {it.episodeName}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Search;
