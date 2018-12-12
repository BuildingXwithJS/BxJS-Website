import Link from 'next/link';

export default () => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <Link href="/">
        <a className="navbar-item">BxJS</a>
      </Link>
    </div>

    <div id="navbarBasicExample" className="navbar-menu">
      <div className="navbar-start">
        <Link href="/">
          <a className="navbar-item">About BxJS</a>
        </Link>

        <Link href="/weekly">
          <a className="navbar-item">BxJS Weekly</a>
        </Link>

        <Link href="/content">
          <a className="navbar-item">BxJS Content</a>
        </Link>
      </div>
    </div>
  </nav>
);
