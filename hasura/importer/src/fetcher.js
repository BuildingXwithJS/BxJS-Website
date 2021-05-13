import dateFns from "date-fns";
import fetch from "node-fetch";

const jsonURL =
  "https://github.com/BuildingXwithJS/bxjs-weekly/releases/download/20210220104014-b0d58c9/bxjs.json";

export const getLinksAndEpisodes = async () => {
  const data = await fetch(jsonURL).then((r) => r.json());

  const episodes = {};
  const links = [];

  // parse json into arrays
  for (const item of data) {
    if (!episodes[item.episodeName]) {
      const filename = item.filename;
      const [, year, weeks] = /(\d+)-(\d+)-(.+?)\./.exec(filename);
      const yearDate = dateFns.parse(
        `20${year}-01-01`,
        "yyyy-MM-dd",
        new Date()
      );
      const weekDate = dateFns.addWeeks(yearDate, weeks - 1);
      const episodeDate = dateFns.lastDayOfWeek(weekDate);

      const episode = {
        name: item.episodeName,
        date: episodeDate,
      };
      episodes[item.episodeName] = episode;
    }

    const link = {
      category: item.category,
      title: item.title,
      url: item.urls,
      episode: item.episodeName,
    };
    links.push(link);
  }

  return { links, episodes };
};
