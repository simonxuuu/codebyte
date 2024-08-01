// courtiq/app/layout.js
import Link from 'next/link';
import '../styles/globals.css';
import TopBar from './TopBar';

export const metadata = {
  title: 'CourtIQ',
  description: 'CourtIQ is a platform for basketball players, coaches, and recruiters.',
};

export default function Layout({ children }) {
  return (
    <html>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description}/>
      </head>
    <body>
    <div class="container">
      <TopBar />
     
          {children}
      
    </div>
    </body>
    </html>
  );
}