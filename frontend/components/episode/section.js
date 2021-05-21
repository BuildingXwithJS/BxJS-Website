import React from 'react';

function EpisodeSection({ name, links }) {
  return (
    <div>
      <h2 className="text-xl pr-2 pb-1 pt-4">{name}</h2>

      <ul>
        {links.map(({ url, title }) => (
          <li key={url} className="py-1">
            <a
              className="text-blue-700 dark:text-blue-500 hover:underline"
              href={url}
              target="_blank"
              rel="noreferrer"
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EpisodeSection;
