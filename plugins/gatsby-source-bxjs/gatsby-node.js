/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint no-loop-func: off */
/* FIXME: Remove eslint-disable comments and Fix all eslint errors */
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const dateFns = require('date-fns');
const MarkdownIt = require('markdown-it');
const { markdownToDocuments } = require('./episodesToDocuments');

// markdown parser
const md = new MarkdownIt();

// cache
const CACHE_EXPIRES_IN_DAYS = 2;
const cachePath = path.join(__dirname, 'episode.cache.json');

// episode fetching
const baseUrl = 'https://api.github.com/repos/BuildingXwithJS/bxjs-weekly';
const episodesListUrl = `${baseUrl}/contents/links`;

const getEpisodesJson = async () => {
  if (fs.existsSync(cachePath)) {
    console.log('Episode cache found, validating..');
    const cacheStat = fs.statSync(cachePath);
    if (
      cacheStat.isFile() &&
      dateFns.differenceInDays(new Date(), new Date(cacheStat.ctimeMs)) <
        CACHE_EXPIRES_IN_DAYS
    ) {
      console.log('Loading episodes from cache...');
      const cachedEpisodes = JSON.parse(fs.readFileSync(cachePath));
      return cachedEpisodes;
    }
  }

  console.log('Fetching episodes from github...');
  const episodes = await fetch(episodesListUrl).then(r => r.json());
  fs.writeFileSync(cachePath, JSON.stringify(episodes));
  return episodes;
};

exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions;

  const episodes = await getEpisodesJson();

  const allSearchItems = [];
  const allEpisodes = [];
  let docId = 1;

  for (const episode of episodes) {
    const episodeUrl = episode.download_url;
    const filename = episode.name;
    const [, year, weeks, episodeName] = /(\d+)-(\d+)-(.+?)\./.exec(filename);
    const yearDate = dateFns.parse(`20${year}-01-01`, 'yyyy-MM-dd', new Date());
    const weekDate = dateFns.addWeeks(yearDate, weeks - 1);
    const episodeDate = dateFns.lastDayOfWeek(weekDate);
    const markdown = await fetch(episodeUrl).then(r => r.text());
    const documents = await markdownToDocuments(markdown);

    // push into array of all links used for searching
    documents
      .map(d => ({
        ...d,
        episodeName: episodeName.replace(/-/g, ' '),
        episodeUrl: `/${episodeName.replace(/-/g, '')}`,
      }))
      .forEach(item => allSearchItems.push(item));

    // create new episode and use links inside of it
    const newEpisode = {
      id: `${(docId += 1)}`,
      data: {
        filename,
        episodeName: episodeName.replace(/-/g, ' '),
        episodeUrl: `/${episodeName.replace(/-/g, '')}`,
        episodeDate,
        markdown,
        html: md.render(markdown),
        links: documents,
      },
      internal: {
        type: 'episode',
        contentDigest: episodeName,
      },
    };
    allEpisodes.push(newEpisode);
  }

  // save json used for search
  fs.writeFileSync(
    path.join(__dirname, '..', '..', 'static', 'links.json'),
    JSON.stringify(allSearchItems),
  );
  // import nodes to gatsby
  allEpisodes.forEach(item => createNode(item));
};
