import Link from 'next/link';
import React, { useMemo, useRef, useState } from 'react';
import { gql, useQuery } from 'urql';
import Loader from '../loader/index.js';

const EpisodesQuery = gql`
  query FindLinks($query: String) {
    bxjsweekly_links(
      where: {
        _or: [{ url: { _ilike: $query } }, { title: { _ilike: $query } }]
      }
      limit: 10
    ) {
      id
      url
      title
      category
      episodeData {
        id
        name
      }
    }
  }
`;

function Search() {
  const [search, setSearch] = useState('');
  const [{ data, fetching: loading, error }] = useQuery({
    query: EpisodesQuery,
    variables: {
      query: search,
    },
    pause: !search || search.length < 4,
  });
  const debounceRef = useRef();

  const handleSearch = (e) => {
    const input = e.target.value;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      setSearch(`%${input}%`);
    }, 750);
  };

  const results = useMemo(() => data?.bxjsweekly_links ?? [], [data]);

  return (
    <>
      {loading && (
        <div className="mr-2">
          <Loader />
        </div>
      )}
      <div className="mt-3 md:mt-0">
        <input
          className="border text-gray-700 dark:text-gray-400 dark:bg-gray-900 shadow appearance-none rounded-full w-full py-2 px-3 text-sm leading-tight focus:outline-none focus:shadow-outline"
          id="search"
          type="text"
          placeholder="Search.."
          onChange={handleSearch}
        />

        <div className="search-results absolute overflow-auto w-11/12 md:w-1/3 mt-10 md:mt-8">
          {error && (
            <div className="dark:bg-gray-800 bg-gray-100 mx-auto flex p-6 m-2 rounded-lg shadow-lg mr-2">
              <div className="flex flex-col flex-1">
                <h4 className="text-gray-900 dark:text-gray-500 text-xl leading-tight">
                  Error executing search query!
                </h4>
                <p className="text-sm text-gray-600 leading-normal">
                  {error.toString()}
                </p>
              </div>
            </div>
          )}
          {search.length >= 4 &&
            results.map((it) => (
              <div
                className="dark:bg-gray-800 bg-gray-100 mx-auto flex p-6 m-2 rounded-lg shadow-lg mr-2"
                key={it.url}
              >
                <div className="flex flex-col flex-1">
                  <a href={it.url} target="_blank" rel="noopener noreferrer">
                    <h4 className="text-gray-900 dark:text-gray-500 text-xl leading-tight">
                      {it.title}
                    </h4>
                  </a>
                  <p className="text-sm text-gray-600 leading-normal">
                    {it.category}
                  </p>
                </div>
                <Link href={`/episodes/${it.episodeData.name}`}>
                  <a className="flex items-center text-sm text-gray-600 pl-1">
                    {it.episodeData.name}
                  </a>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Search;
