import 'bulma/css/bulma.min.css';
import getConfig from 'next/config';
import dynamic from 'next/dynamic';
import React from 'react';
import {getEpisodes} from '../components/github';
import Navbar from '../components/navbar';
import SearchEpisode from '../components/searchEpisode';

const {publicRuntimeConfig} = getConfig();

const baseUrl = publicRuntimeConfig.baseUrl;
const episodesDataUrl = `${baseUrl}/api/episode`;

// create dynamically loaded search component
const Search = dynamic(() => import('../components/search'), {
  loading: () => <input className="input" type="text" placeholder="Loading search.." readOnly />,
});

export default class Weekly extends React.Component {
  static async getInitialProps({query}) {
    const episodes = await getEpisodes();
    const currentEpisode = query.file ? episodes.find(ep => ep.filename === query.file) : episodes[0];
    const episodeUrl = `${episodesDataUrl}?url=${encodeURIComponent(currentEpisode.url)}`;
    const {markdown, html} = await fetch(episodeUrl).then(r => r.json());
    currentEpisode.contentMarkdown = markdown;
    currentEpisode.contentHtml = html;
    return {episodes, currentEpisode};
  }

  state = {
    showSearch: false,
  };

  showSearch = () => {
    this.setState({showSearch: true});
  };


  render() {
    const {currentEpisode, episodes} = this.props;
    const {showSearch} = this.state;
    const {contentHtml, name} = currentEpisode;

    return (
      <div className="container">
        <Navbar />
        <div className="section">
        <div style={{ margin: "1rem 0rem" }}>
          {!showSearch && (
            <button type="button" className="button" style={{ minWidth: "100%" }} onClick={this.showSearch}>
              Search in the episodes
            </button>
          )}
          {showSearch && <Search />}
        </div>
        <style jsx>{`
          @media screen and (max-width: 768px) {
            h2 {
              font-size: 1.5rem!important;
            }
          }
        `}</style>
        <h1 className="title">BxJS Weekly - {name}</h1>
        <div className="columns">
          <div className="column content is-four-fifths" dangerouslySetInnerHTML={{__html: contentHtml}} />
          <div className="column content">
            <h4>Episodes list:</h4>
            <SearchEpisode episodes={episodes} currentEpisode={currentEpisode} />
          </div>
        </div>
        </div>
      </div>
    );
  }
}
