import React from 'react';
import EpisodeSection from './episodeSection';

const groupsList = [
  'Getting started',
  'Articles & News',
  'Tips, tricks & bit-sized awesomeness',
  'Releases',
  'Libs & demos',
  'Interesting & silly stuff',
];

function Episode({ name, date, groups }) {
  console.log(groupsList, groups);
  return (
    <div>
      <div className="flex items-center pb-1 pt-4">
        <h1 className="text-3xl">{name}</h1>
        <span className="pl-2 text-gray-500 text-base">
          {new Date(date).toLocaleDateString()}
        </span>
      </div>

      {groupsList
        .filter(groupName => groups.find(g => g.fieldValue === groupName))
        .map(groupName => (
          <EpisodeSection
            key={groupName}
            name={groupName}
            links={groups.find(g => g.fieldValue === groupName).edges}
          />
        ))}
    </div>
  );
}

export default Episode;
