module.exports = {
  serialize: ({ query: { site, allEpisode } }) => {
    return allEpisode.edges.map(({ node }) => ({
      title: `BxJS Weekly - ${node.data.episodeName}`,
      date: node.data.episodeDate,
      url: site.siteMetadata.siteUrl + node.data.episodeUrl,
      guid: site.siteMetadata.siteUrl + node.data.episodeUrl,
      custom_elements: [{ 'content:encoded': node.data.html }],
    }));
  },
  query: `
    {
      allEpisode {
        edges {
          node {
            data {
              links {
                category
                title
                urls
              }
              episodeDate
              episodeName
              episodeUrl
              html
              filename
            }
          }
        }
      }
    }
  `,
  output: '/rss.xml',
  title: 'BxJS Weekly RSS Feed',
};
