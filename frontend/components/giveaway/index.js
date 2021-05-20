import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useMutation } from 'urql';
import { ENTER_GIVEAWAY } from '../graphql/queries/giveaways.js';

export default function Giveaway({ giveaway, user, reexecute }) {
  const [, enterGiveaway] = useMutation(ENTER_GIVEAWAY);

  const submit = async () => {
    await enterGiveaway({ giveaway: giveaway.id });
    reexecute({ requestPolicy: 'network-only' });
  };

  return (
    <div className="flex flex-col border border-gray-300 bg-gray-300 rounded-lg p-4">
      <h2 className="text-xl font-bold">{giveaway.name}</h2>
      <div className="prose">
        <ReactMarkdown>{giveaway.description}</ReactMarkdown>
      </div>
      {user && giveaway.participants?.length === 0 && (
        <button
          type="button"
          className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={submit}
        >
          Enter giveaway
        </button>
      )}
      {user && giveaway.participants?.length > 0 && (
        <div className="font-bold text-xl text-black p-2">You are in!</div>
      )}
    </div>
  );
}
