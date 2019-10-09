const path = require(`path`);

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  // mdx news rendering
  const episodeTemplate = path.resolve('./src/templates/episode.js');
  const episodesResult = await graphql(`
    {
      allLink {
        distinct(field: data___episodeUrl)
      }
    }
  `);
  if (episodesResult.errors) {
    return Promise.reject(episodesResult.errors);
  }
  episodesResult.data.allLink.distinct.forEach(episodeUrl => {
    createPage({
      path: episodeUrl,
      component: episodeTemplate,
      context: {},
    });
  });
};
