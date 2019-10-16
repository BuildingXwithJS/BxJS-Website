import React from 'react';

function EpisodeSection({ name, links }) {
  return (
    <div>
      <h2 className="text-xl pr-2 pb-1 pt-4">{name}</h2>

      <ul>
        {links.map(({ node }) => (
          <li key={node.id} className="py-1">
            <a className="text-blue-700" href={node.data.urls}>
              {node.data.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EpisodeSection;
