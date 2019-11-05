const _ = require('highland');

// gets all links from string
const extractLinks = str => {
  const results = [];
  const regex = /\[(.+?)\]\((.+?)\)/g;
  let res = regex.exec(str);
  while (res) {
    const url = res[2];
    results.push(url);
    res = regex.exec(str);
  }
  return results;
};

exports.markdownToDocuments = text => {
  const sections = text.split('## ');
  return _(sections)
    .map(section => section.replace(/\r/g, ''))
    .filter(
      section =>
        section && section.length > 0 && section.replace(/\n/g, '').length > 0
    )
    .flatMap(text => {
      const [name, linksText] = text.split(/:\n/g);
      if (!linksText) {
        console.error('Error processing episode:', text);
        return _([]);
      }
      const sectionName = name.trim();
      const links = linksText.split('\n');
      return _(links)
        .filter(l => l && l.length > 0)
        .map(link => {
          const urls = extractLinks(link);
          const title = link
            .replace(/\[(.+?)\]\((.+?)\)/g, '$1')
            .replace(/^-/g, '')
            .trim();
          return {
            category: sectionName,
            title,
            urls: urls.join(', '),
            urlsSet: urls,
          };
        });
    })
    .filter(result => result)
    .collect()
    .toPromise(Promise);
};
