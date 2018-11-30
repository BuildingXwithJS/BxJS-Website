import fetch from 'isomorphic-unfetch';

const baseUrl = 'https://api.github.com/repos/BuildingXwithJS/bxjs-weekly';

const episodesList = `${baseUrl}/contents/links`;

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
