# Website planning

## Pages

1. Info page:

- Streaming schedule
- Social links
  - Discord
  - Twitch
  - Github
  - Twitter
  - Facebook page
  - Reddit
  - Email
- Twitter feed?

2. BxJS Weekly news

- [ ] current week page

  - just render markdown as page

- [ ] archive

  - parse episodes from github
  - render using headers as sections

- [ ] search (see below)
- [x] dedupe service / CI pipeline (see below)

3. Videos

- collection of dev.to posts
  - github repo with all links?
  - autoscrape from dev.to using author & tags ?
  - dev.to api ?

## Search

In-memory using PR/CI pipeline.

http://elasticlunr.com

1. 2 branches - master and develop
2. Commit to develop, then send PR to master
3. CI pipeline (re-)indexes all files and uploads index somewhere (publishes as artifact?)
4. On merge - github trigger webhook
5. Server download new index
6. Replaces old index with new one in memory (is this possible?)
7. User can search in new index

## Hosting options

- Host on current Scaleway server
- Buy server (e.g. Hetzner)
