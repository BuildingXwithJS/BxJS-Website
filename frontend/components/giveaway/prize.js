import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function Prize({ prize }) {
  return (
    <div className="w-full p-4">
      <div className="p-4 rounded-xl bg-gray-50">
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 mb-2 text-black bg-gray-100 rounded-full">
          🏆
        </div>
        <h1 className="mb-4 text-3xl font-semibold leading-none tracking-tighter text-black title-font">
          {prize.name}
        </h1>
        <div className="prose text-base font-medium leading-relaxed text-gray-700">
          <ReactMarkdown>{prize.description}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
