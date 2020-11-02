import React from 'react';
import { themeStyles, useTheme } from './theme';

function EpisodeSection({ name, links }) {
  const { theme } = useTheme();

  return (
    <div>
      <h2 className="text-xl pr-2 pb-1 pt-4">{name}</h2>

      <ul>
        {links.map(({ urls, title }) => (
          <li key={urls} className="py-1">
            <a
              className={`${themeStyles[theme].linkColor} hover:underline`}
              href={urls}
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
