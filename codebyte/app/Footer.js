// courtiq/app/Footer.js
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <svg width="1000" height="100" viewBox="0 0 460 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M236 10C235.448 10 235 10.4477 235 11C235 11.5523 235.448 12 236 12V10ZM236 12L461 12V10L236 10V12Z" fill="white"/>
          <path d="M225 13C225.552 13 226 12.5523 226 12C226 11.4477 225.552 11 225 11V13ZM0 13H225V11H0V13Z" fill="white"/>
          <path d="M225 12L242.492 21.9443" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <path d="M218.5 1L235.992 10.9443" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <div className="social-icons">
          <Link href="#" className="icon-link">
            <Image src="/assets/instagram-icon.png" alt="Instagram" width={24} height={24} />
          </Link>
          <Link href="#" className="icon-link">
            <Image src="/assets/linkedin-icon.png" alt="LinkedIn" width={24} height={24} />
          </Link>
          <Link href="#" className="icon-link">
            <Image src="/assets/email-icon.png" alt="Email" width={24} height={24} />
          </Link>
        </div>
        <div className="copyright">© CourtIQ. All rights reserved.</div>
      </div>
      <Image src="/assets/headstarter-icon.png" alt="Headstarter" width={100} height={50} className="headstarter-logo" />
    </footer>
  );
};

export default Footer;