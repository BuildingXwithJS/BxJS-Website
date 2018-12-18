import 'bulma/css/bulma.min.css';
import React from 'react';
import {
  FaAt,
  FaDev,
  FaDiscord,
  FaDonate,
  FaFacebook,
  FaGithub,
  FaItunes,
  FaLink,
  FaPodcast,
  FaReddit,
  FaTwitch,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';
import Navbar from '../components/navbar';

const verticalIcon = {verticalAlign: 'middle'};

export default () => {
  return (
    <div className="container">
      <style jsx>{`
        .schedule-title {
          font-size: 1.6em;
          margin-bottom: 5px !important;
        }
        .schedule-text {
          font-size: 1.25em;
        }
      `}</style>

      <Navbar />

      <div className="section content">
        <h2>BxJS</h2>

        <p>BxJS - or "Building X with JS" - is a TODO: write a proper description of BxJS stuff</p>

        <h2>
          <FaTwitch style={verticalIcon} /> Streaming schedule
        </h2>
        <div className="columns">
          <div className="column has-text-centered">
            <p className="schedule-title">Software development stream</p>
            <p className="schedule-text">
              Every <strong>Wed @ 19:00</strong>{' '}
              <a href="https://www.worldtimebuddy.com/?qm=1&lid=2950159&h=2950159&sln=19-20">Berlin time</a>
            </p>
          </div>
          <div className="column has-text-centered">
            <p className="schedule-title">BxJS Weekly podcast stream</p>
            <p className="schedule-text">
              Every <strong>Sat @ 20:00</strong>{' '}
              <a href="https://www.worldtimebuddy.com/?qm=1&lid=2950159&h=2950159&sln=20-21">Berlin time</a>
            </p>
          </div>
        </div>

        <h2>
          <FaLink style={verticalIcon} /> Related resources
        </h2>
        <div className="columns">
          <div className="column">
            <FaYoutube style={verticalIcon} /> <a href="https://www.youtube.com/c/TimErmilov">YouTube</a>
          </div>
          <div className="column">
            <FaTwitch style={verticalIcon} /> <a href="https://www.twitch.tv/yamalight">Twitch</a>
          </div>
          <div className="column">
            <FaPodcast style={verticalIcon} /> <a href="https://castbox.fm/channel/id1378315">Castbox</a>
          </div>
          <div className="column">
            <FaItunes style={verticalIcon} />{' '}
            <a href="https://itunes.apple.com/us/podcast/bxjs-weekly/id1441956525">iTunes</a>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <FaDiscord style={verticalIcon} /> <a href="https://discord.gg/hnKCXqQ">Discord</a>
          </div>
          <div className="column">
            <FaGithub style={verticalIcon} /> <a href="https://github.com/BuildingXwithJS">Github</a>
          </div>
          <div className="column">
            <FaReddit style={verticalIcon} /> <a href="https://www.reddit.com/r/BuildingWithJS">Reddit</a>
          </div>
          <div className="column">
            <FaDev style={verticalIcon} /> <a href="https://dev.to/yamalight">Dev.to</a>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <FaTwitter style={verticalIcon} /> <a href="https://twitter.com/yamalight">Twitter</a>
          </div>
          <div className="column">
            <FaFacebook style={verticalIcon} /> <a href="https://www.facebook.com/buildingproductswithjs/">Facebook</a>
          </div>
          <div className="column">
            <FaAt style={verticalIcon} /> <a href="mailto:yamalight@gmail.com">Email</a>
          </div>
          <div className="column">
            <FaDonate style={verticalIcon} /> <a href="https://codezen.net/support.html">Support me</a>
          </div>
        </div>
      </div>
    </div>
  );
};
