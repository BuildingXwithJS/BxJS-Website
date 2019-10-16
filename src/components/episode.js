import React from 'react';

function Episode({ name, date, links }) {
  return (
    <div>
      <div className="flex items-center pb-1 pt-4">
        <h2 className="text-xl pr-2">{name}</h2>
        <span className="text-gray-500 text-base">
          {new Date(date).toLocaleDateString()}
        </span>
      </div>

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

export default Episode;
