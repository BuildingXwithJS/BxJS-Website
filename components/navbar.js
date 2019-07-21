import Link from 'next/link';
import { useState } from 'react'

function NavBar() {
  const [active, setActive] = useState(false);

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link href="/">
          <a className="navbar-item">BxJS</a>
        </Link>
        <a role="button"
          className={active ? 'navbar-burger is-active' : 'navbar-burger'}
            onClick={() => setActive(!active)}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div className={active ? 'navbar-menu is-active' : 'navbar-menu'}>
        <div className="navbar-start">
          <Link href="/weekly">
            <a className="navbar-item">BxJS Weekly</a>
          </Link>
        </div>
      </div>
  </nav>
  )
}

export default NavBar
