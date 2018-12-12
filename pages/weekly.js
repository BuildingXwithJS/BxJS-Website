import 'bulma/css/bulma.min.css';
import getConfig from 'next/config';
import dynamic from 'next/dynamic';
import React from 'react';
import Episode from '../components/episode';
import {getEpisodes} from '../components/github';
import Navbar from '../components/navbar';

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
        <div>
          {!showSearch && (
            <button type="button" className="button" onClick={this.showSearch}>
              Search in the episodes
            </button>
          )}
          {showSearch && <Search />}
        </div>
        <h1 className="title">BxJS Weekly - {name}</h1>
        <div className="columns">
          <div className="column content is-four-fifths" dangerouslySetInnerHTML={{__html: contentHtml}} />
          <div className="column content">
            <h2>Episodes list:</h2>
            {episodes.map(e => (
              <Episode currentEpisode={currentEpisode} key={e.url} episode={e} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
