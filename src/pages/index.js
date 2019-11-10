import { graphql } from 'gatsby';
import React from 'react';
import {
  FaAt,
  FaDev,
  FaDiscord,
  FaDonate,
  FaFacebook,
  FaGithub,
  FaItunes,
  FaPodcast,
  FaReddit,
  FaTwitch,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';
import Episode from '../components/episode';
import Layout from '../components/layout';
import SEO from '../components/seo';

function IndexPage({
  data: {
    allEpisode: {
      edges: [episode],
    },
  },
}) {
  return (
    <Layout>
      <SEO
        keywords={[`bxjs`, `podcast`, `bxjs-weekly`, `javascript`, `react`]}
        title="BxJS - javascript community"
      />

      <h1 className="text-3xl	py-4">BxJS</h1>

      <div className="socials">
        <div className="social-row">
          <a
            href="https://www.youtube.com/c/TimErmilov"
            className="social-link"
          >
            <FaYoutube className="mr-2" /> YouTube
          </a>
          <a href="https://discord.gg/hnKCXqQ" className="social-link">
            <FaDiscord className="mr-2" /> Discord
          </a>
          <a href="https://twitter.com/yamalight" className="social-link">
            <FaTwitter className="mr-2" /> Twitter
          </a>
        </div>
        <div className="social-row">
          <a href="https://www.twitch.tv/yamalight" className="social-link">
            <FaTwitch className="mr-2" /> Twitch
          </a>
          <a href="https://github.com/BuildingXwithJS" className="social-link">
            <FaGithub className="mr-2" /> Github
          </a>
          <a
            href="https://www.facebook.com/buildingproductswithjs/"
            className="social-link"
          >
            <FaFacebook className="mr-2" /> Facebook
          </a>
        </div>
        <div className="social-row">
          <a
            href="https://castbox.fm/channel/id1378315"
            className="social-link"
          >
            <FaPodcast className="mr-2" /> Castbox
          </a>
          <a
            href="https://www.reddit.com/r/BuildingWithJS"
            className="social-link"
          >
            <FaReddit className="mr-2" /> Reddit
          </a>
          <a href="mailto:yamalight@gmail.com" className="social-link">
            <FaAt className="mr-2" /> Email
          </a>
        </div>
        <div className="social-row">
          <a
            href="https://itunes.apple.com/us/podcast/bxjs-weekly/id1441956525"
            className="social-link"
          >
            <FaItunes className="mr-2" /> iTunes
          </a>
          <a href="https://dev.to/yamalight" className="social-link">
            <FaDev className="mr-2" /> Dev.to
          </a>
          <a href="https://codezen.net/support.html" className="social-link">
            <FaDonate className="mr-2" /> Support me
          </a>
        </div>
      </div>

      <Episode data={episode.node.data} />
    </Layout>
  );
}

export default IndexPage;

export const pageQuery = graphql`
  query {
    allEpisode(sort: { fields: data___episodeDate, order: DESC }, limit: 1) {
      edges {
        node {
          data {
            episodeUrl
            episodeName
            filename
            episodeDate
            links {
              category
              title
              urls
              urlsSet
            }
          }
          id
        }
      }
    }
  }
`;
