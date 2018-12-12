import fetch from 'isomorphic-unfetch';
import getConfig from 'next/config';

const {publicRuntimeConfig} = getConfig();

const baseUrl = publicRuntimeConfig.baseUrl;
const episodesList = `${baseUrl}/api/episodes`;

export const getEpisodes = async () => {
  const res = await fetch(episodesList).then(r => r.json());

  const episodes = res
    .map(item => {
      const [, episodeName] = /\d+-\d+-(.+?)\./.exec(item.name);

      return {
        name: episodeName.replace('-', ' '),
        filename: item.name,
        url: item.download_url,
      };
    })
    .sort((a, b) => b.filename.localeCompare(a.filename));

  return episodes;
};
