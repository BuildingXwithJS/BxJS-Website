import React from 'react';
import { themeStyles, useTheme } from '../theme/index.js';

function EpisodeSection({ name, links }) {
  const { theme } = useTheme();

  return (
    <div>
      <h2 className="text-xl pr-2 pb-1 pt-4">{name}</h2>

      <ul>
        {links.map(({ url, title }) => (
          <li key={url} className="py-1">
            <a
              className={`${themeStyles[theme].linkColor} hover:underline`}
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
