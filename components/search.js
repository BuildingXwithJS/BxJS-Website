import fetch from 'isomorphic-unfetch';
import getConfig from 'next/config';
import Link from 'next/link';
import React, {useState} from 'react';

const {serverRuntimeConfig, publicRuntimeConfig} = getConfig();

const baseUrl = publicRuntimeConfig.baseUrl;
const searchUrl = `${baseUrl}/api/search`;

const fetchResults = async (query, setResults) => {
  const q = encodeURIComponent(query);
  const results = await fetch(`${searchUrl}?q=${q}`).then(r => r.json());
  setResults(results);
};

export default () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleChange = e => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery.length === 0) {
      setResults([]);
    }
  };
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      fetchResults(query, setResults);
      return;
    }
    if (e.key === 'Escape') {
      setResults([]);
      setQuery('');
    }
  };

  return (
    <div className="card">
      <header className="card-header">
        <input
          className="input"
          type="text"
          placeholder="Search for article.."
          value={query}
          onChange={handleChange}
          onKeyUp={handleKeyPress}
        />
      </header>
      {results.length > 0 && (
        <div className="card-content">
          {results.map(item => (
            <div className="is-flex">
              <span className="tag">{item.category}</span>
              <a href={item.urls} style={{flex: 1, textAlign: 'center'}}>
                {item.title}
              </a>
              <span className="tag is-white">
                <Link href={`/weekly/${item.filename}`}>
                  <a className="episode">{item.episodeName}</a>
                </Link>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
