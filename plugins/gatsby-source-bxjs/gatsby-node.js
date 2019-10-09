const fetch = require('node-fetch');
const { markdownToDocuments } = require('./episodesToDocuments');

const baseUrl = 'https://api.github.com/repos/BuildingXwithJS/bxjs-weekly';
const episodesListUrl = `${baseUrl}/contents/links`;

exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions;

  const episodes = await fetch(episodesListUrl).then(r => r.json());

  const allItems = [];
  let docId = 1;
  let episodesLimit = 3;

  for (const episode of episodes) {
    const episodeUrl = episode.download_url;
    const filename = episode.name;
    const [, episodeName] = /\d+-\d+-(.+?)\./.exec(filename);
    const markdown = await fetch(episodeUrl).then(r => r.text());
    const documents = await markdownToDocuments(markdown);
    documents
      .map(d => ({
        id: `${docId++}`,
        data: {
          ...d,
          filename,
          episodeName: episodeName.replace(/-/g, ' '),
          episodeUrl: `/${episodeName.replace(/-/g, '')}`,
        },
        internal: {
          type: 'link',
          contentDigest: d.title,
        },
      }))
      .forEach(item => allItems.push(item));
    episodesLimit--;
    if (episodesLimit === 0) {
      break;
    }
  }

  // import nodes to gatsby
  allItems.forEach(item => createNode(item));
};
