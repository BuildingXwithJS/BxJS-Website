import React from 'react';
import EpisodeSection from './episodeSection';

function Episode({ name, date, groups }) {
  return (
    <div>
      <div className="flex items-center pb-1 pt-4">
        <h1 className="text-3xl">{name}</h1>
        <span className="pl-2 text-gray-500 text-base">
          {new Date(date).toLocaleDateString()}
        </span>
      </div>

      {groups.map(group => (
        <EpisodeSection
          key={group.fieldValue}
          name={group.fieldValue}
          links={group.edges}
        />
      ))}
    </div>
  );
}

export default Episode;
