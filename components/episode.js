import Link from 'next/link';

export default ({episode, currentEpisode}) => (
  <div>
    <style jsx>{`
      .episode {
        font-weight: ${episode.url === currentEpisode.url ? 'bold' : 'inherit'};
      }
    `}</style>
    <Link href={`/weekly/${episode.filename}`}>
      <a className="episode">{episode.name}</a>
    </Link>
  </div>
);
