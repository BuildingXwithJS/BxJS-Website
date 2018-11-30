import Link from 'next/link';

export default ({episode}) => (
  <div>
    <Link href={`/episode/${episode.filename}`}>
      <a>{episode.name}</a>
    </Link>
  </div>
);
