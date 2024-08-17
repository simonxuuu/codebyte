// courtiq/app/layout.js
import Link from 'next/link';
import '../styles/globals.css';
import '../styles/hamburgers.css';
import './dashboard/dashboard.css';
import TopBar from './topBar';
import Footer from './footer';
import Head from 'next/head';
<<<<<<< HEAD

=======
import { AppProvider } from './appContext';
>>>>>>> 3695c40 (finished)
export const metadata = {
  title: 'Codebyte',
  description: 'CourtIQ is a platform for basketball players, coaches, and recruiters.',
};

export default function Layout({ children }) {
  return (
    
    <html>
     <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description}/>
      </Head>
    <body>
   
      <TopBar />
          {children}
        <Footer />
    
    
    </body>

   
    
    </html>
    
  );
}