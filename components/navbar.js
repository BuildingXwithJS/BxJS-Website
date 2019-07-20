import Link from 'next/link';

export default () => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <Link href="/">
        <a className="navbar-item">BxJS</a>
      </Link>
      <Link href="/weekly">
          <a className="navbar-item">BxJS Weekly</a>
      </Link>
    </div>
  </nav>
);
