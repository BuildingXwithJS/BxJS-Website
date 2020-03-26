import React from 'react';

function EpisodeSection({ name, links }) {
  return (
    <div>
      <h2 className="text-xl pr-2 pb-1 pt-4">{name}</h2>

      <ul>
        {links.map(({ urls, title }) => (
          <li key={urls} className="py-1">
            <a className="text-blue-700 hover:underline" href={urls} target="_blank" ref="nofolow">
              {title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EpisodeSection;
