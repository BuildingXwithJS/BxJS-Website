import Link from 'next/link';

export default ({data}) => (
  <div className="card">
    <style jsx>{`
      .card {
        margin-bottom: 30px;
      }
      .tags {
        display: flex;
        flex-direction: row;
      }
      .category {
        padding-bottom: 10px;
      }
    `}</style>
    <header className="card-header">
      <a className="card-header-title" href={data.urlsSet[0]}>
        {data.title}
      </a>
    </header>

    <div className="card-content">
      <div className="category">Category: {data.category}</div>
      <div className="tags">
        {data.keywords.map(word => (
          <span className="tag">{word}</span>
        ))}
      </div>
    </div>

    <footer className="card-footer">
      <Link href={`/weekly/${data.filename}`}>
        <a className="card-footer-item episode">{data.episodeName}</a>
      </Link>
    </footer>
  </div>
);
