/* eslint no-loop-func: off */
const fetch = require('node-fetch');
const dateFns = require('date-fns');
const { markdownToDocuments } = require('./episodesToDocuments');

const baseUrl = 'https://api.github.com/repos/BuildingXwithJS/bxjs-weekly';
const episodesListUrl = `${baseUrl}/contents/links`;

exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions;

  const episodes = await fetch(episodesListUrl).then(r => r.json());

  const allItems = [];
  let docId = 1;

  for (const episode of episodes) {
    const episodeUrl = episode.download_url;
    const filename = episode.name;
    const [, year, weeks, episodeName] = /(\d+)-(\d+)-(.+?)\./.exec(filename);
    const yearDate = dateFns.parse(`20${year}-01-01`, 'yyyy-MM-dd', new Date());
    const weekDate = dateFns.addWeeks(yearDate, weeks);
    const episodeDate = dateFns.lastDayOfWeek(weekDate);
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
          episodeDate,
        },
        internal: {
          type: 'link',
          contentDigest: d.title,
        },
      }))
      .forEach(item => allItems.push(item));
  }

  // import nodes to gatsby
  allItems.forEach(item => createNode(item));
};
