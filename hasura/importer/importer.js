import { getLinksAndEpisodes } from "./src/fetcher.js";
import {
  BATCH_INSERT_EPISODES,
  BATCH_INSERT_LINKS,
  graphQLClient,
} from "./src/graphql.js";

const { episodes, links } = await getLinksAndEpisodes();

// Run episodes insert query
const result = await graphQLClient.request(BATCH_INSERT_EPISODES, {
  episodes: Object.keys(episodes).map((key) => episodes[key]),
});
// get created episodes to match IDs
const createdEpisodes = result?.insert_bxjsweekly_episodes?.returning;
console.log(createdEpisodes);

// assign new episode IDs to links
const linksWithEpisodeIDs = links.map((link) => ({
  ...link,
  episode: createdEpisodes.find((ep) => ep.name === link.episode).id,
}));

// Run episodes insert query
const linksResult = await graphQLClient.request(BATCH_INSERT_LINKS, {
  links: linksWithEpisodeIDs,
});
// get created episodes to match IDs
const createdLinks = linksResult?.insert_bxjsweekly_links?.returning;
console.log(createdLinks);
