import 'bulma/css/bulma.min.css';
import Episode from '../components/episode';
import {getEpisodes} from '../components/github';
import Navbar from '../components/navbar';

export default class Weekly extends React.Component {
  static async getInitialProps() {
    const episodes = await getEpisodes();
    return {episodes};
  }

  render() {
    return (
      <div className="container">
        <Navbar />
        <h1 className="title">BxJS Weekly Episodes:</h1>
        {this.props.episodes.map(e => (
          <Episode key={e.url} episode={e} />
        ))}
      </div>
    );
  }
}
