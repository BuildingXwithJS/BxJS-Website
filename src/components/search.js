import Fuse from 'fuse.js';
import { Link } from 'gatsby';
import React, { useMemo, useState } from 'react';

const fuseOptions = {
  shouldSort: true,
  threshold: 0.8,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ['node.data.urls', 'node.data.title'],
};

/*const allDataQuery = graphql`
  query {
    allLink(sort: { fields: data___episodeDate, order: DESC }) {
      edges {
        node {
          data {
            episodeUrl
            episodeName
            category
            title
            urls
            episodeDate
          }
          id
        }
      }
    }
  }
`;*/

function Search() {
  /*const {
    allLink: { edges: searchData },
  } = useStaticQuery(allDataQuery);*/
  const searchData = [];
  const [results, setResults] = useState([]);

  const fuse = useMemo(() => new Fuse(searchData, fuseOptions), []);

  const handleSearch = e => {
    const input = e.target.value;
    if (input.length === 0) {
      setResults([]);
      return;
    }
    const found = fuse.search(input);
    setResults(found);
  };

  return (
    <div>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="search"
        type="text"
        placeholder="Search.."
        onChange={handleSearch}
      />

      <div className="search-results">
        {results.slice(0, 10).map(it => (
          <div
            className="mx-auto flex p-6 m-2 bg-gray-100 rounded-lg shadow-lg"
            key={it.node.id}
          >
            <div className="flex flex-col flex-1">
              <a
                href={it.node.data.urls}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h4 className="text-xl text-gray-900 leading-tight">
                  {it.node.data.title}
                </h4>
              </a>
              <p className="text-sm text-gray-600 leading-normal">
                {it.node.data.category}
              </p>
            </div>
            <Link
              to={it.node.data.episodeUrl}
              className="flex items-center text-sm text-gray-600 pl-1"
            >
              {it.node.data.episodeName}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
