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
import Layout from '../components/layout/index.js';

export default function HomePage() {
  return (
    <Layout>
      <h1 className="text-3xl	py-4">BxJS</h1>

      <div className="flex flex-wrap">
        <div className="m-2 md:m-4">
          <a
            href="https://www.youtube.com/c/TimErmilov"
            className="flex my-3 items-center"
          >
            <FaYoutube className="mr-2" /> YouTube
          </a>
          <a
            href="https://discord.gg/hnKCXqQ"
            className="flex my-3 items-center"
          >
            <FaDiscord className="mr-2" /> Discord
          </a>
          <a
            href="https://twitter.com/yamalight"
            className="flex my-3 items-center"
          >
            <FaTwitter className="mr-2" /> Twitter
          </a>
        </div>
        <div className="m-2 md:m-4">
          <a
            href="https://www.twitch.tv/yamalight"
            className="flex my-3 items-center"
          >
            <FaTwitch className="mr-2" /> Twitch
          </a>
          <a
            href="https://github.com/BuildingXwithJS"
            className="flex my-3 items-center"
          >
            <FaGithub className="mr-2" /> Github
          </a>
          <a
            href="https://www.facebook.com/buildingproductswithjs/"
            className="flex my-3 items-center"
          >
            <FaFacebook className="mr-2" /> Facebook
          </a>
        </div>
        <div className="m-2 md:m-4">
          <a
            href="https://anchor.fm/bxjs-weekly"
            className="flex my-3 items-center"
          >
            <FaPodcast className="mr-2" /> Anchor.fm
          </a>
          <a
            href="https://www.reddit.com/r/BuildingWithJS"
            className="flex my-3 items-center"
          >
            <FaReddit className="mr-2" /> Reddit
          </a>
          <a
            href="mailto:yamalight@gmail.com"
            className="flex my-3 items-center"
          >
            <FaAt className="mr-2" /> Email
          </a>
        </div>
        <div className="m-2 md:m-4">
          <a
            href="https://itunes.apple.com/us/podcast/bxjs-weekly/id1441956525"
            className="flex my-3 items-center"
          >
            <FaItunes className="mr-2" /> iTunes
          </a>
          <a href="https://dev.to/yamalight" className="flex my-3 items-center">
            <FaDev className="mr-2" /> Dev.to
          </a>
          <a
            href="https://codezen.net/support.html"
            className="flex my-3 items-center"
          >
            <FaDonate className="mr-2" /> Support me
          </a>
        </div>
      </div>
    </Layout>
  );
}
