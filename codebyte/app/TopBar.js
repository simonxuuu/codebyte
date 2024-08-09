// courtiq/app/TopBar.js
import Link from 'next/link';

const TopBar = () => {
  return (
    <div className="top-bar">
      <Link href="/landing3.html" className="logo">
        CourtIQ
      </Link>
      <nav>
        <Link href="/hello.html">
          Players
        </Link>
        <Link href="/hello.html">
          Coaches
        </Link>
        <Link href="/hello.html">
          Recruiters
        </Link>
      </nav>
      <Link href="/login.html" className="special-button login-button">
        <span className="button-text login-button">Login</span>
      </Link>
    </div>
  );
};

export default TopBar;