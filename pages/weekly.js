import 'bulma/css/bulma.min.css';
import snarkdown from 'snarkdown';
import Episode from '../components/episode';
import {getEpisodes} from '../components/github';
import Navbar from '../components/navbar';
import Search from '../components/search';

export default class Weekly extends React.Component {
  static async getInitialProps({query}) {
    const episodes = await getEpisodes();
    const currentEpisode = query.file ? episodes.find(ep => ep.filename === query.file) : episodes[0];
    const episodeContent = await fetch(currentEpisode.url).then(r => r.text());
    currentEpisode.contentMarkdown = episodeContent;
    currentEpisode.contentHtml = snarkdown(episodeContent);
    return {episodes, currentEpisode};
  }

  render() {
    const {currentEpisode, episodes} = this.props;
    const {contentHtml, name} = currentEpisode;

    return (
      <div className="container">
        <Navbar />
        <Search />
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
