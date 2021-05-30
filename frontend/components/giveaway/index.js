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
    <div className="container items-center p-4">
      <div className="flex flex-wrap">
        <div className="w-full m-4 bg-white border rounded-lg shadow-xl">
          <div className="p-6">
            <h2 className="mb-4 text-xs font-semibold tracking-widest text-black uppercase title-font">
              Ends at: {new Date(giveaway.ends_at).toLocaleDateString()}
            </h2>
            <h4 className="mb-8 text-2xl font-semibold leading-none tracking-tighter text-black lg:text-3xl title-font ">
              {giveaway.name}
            </h4>
            <div className="prose mb-3 text-base leading-relaxed">
              <ReactMarkdown>{giveaway.description}</ReactMarkdown>
            </div>

            {user && giveaway.participants?.length === 0 && (
              <button
                type="button"
                className="w-full px-16 py-2 my-2 text-base font-medium text-white transition duration-500 ease-in-out transform border-black rounded-md bg-black focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-gray-900"
                onClick={submit}
              >
                Enter giveaway
              </button>
            )}
            {user && giveaway.participants?.length > 0 && (
              <div className="w-full px-16 py-2 my-2 text-base font-medium text-gray-600 transition duration-500 ease-in-out transform rounded-md border-gray-50 bg-gray-50 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-gray-100">
                You are in!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
