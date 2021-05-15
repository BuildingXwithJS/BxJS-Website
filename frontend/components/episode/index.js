import groupBy from 'lodash/groupBy';
import React from 'react';
import EpisodeSection from './section.js';

const groupsList = [
  'Getting started',
  'Articles & News',
  'Tips, tricks & bit-sized awesomeness',
  'Releases',
  'Libs & demos',
  'Interesting & silly stuff',
];

function Episode({ data: { name, date, links } }) {
  const groups = groupBy(links, 'category');

  return (
    <div>
      <div className="flex items-center pb-1 pt-4">
        <h1 className="text-3xl">{name}</h1>
        <span className="pl-2 text-gray-500 text-base">
          {new Date(date).toLocaleDateString()}
        </span>
      </div>

      {groupsList
        .filter((groupName) => groups[groupName])
        .map((groupName) => (
          <EpisodeSection
            key={groupName}
            name={groupName}
            links={groups[groupName]}
          />
        ))}
    </div>
  );
}

export default Episode;
