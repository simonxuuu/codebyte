import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import SvgBackground from "./SvgBackground";

export default function Home() {
  return (
    
    <main>
      <SvgBackground />
        <h1>The NBA is waiting on you.</h1>
        <p>Our AI helps you get there.</p>
       

        <Link href="/waitlist" className = "special-button"><span className="button-text">Join Waitlist</span></Link>

        <div className="card-holder">
          <div className="card">
              <h2>Real-Time</h2>
              <p className="card-text">Our AI helps you get scouted by the best teams in the NBA.</p>
          </div>
          <div className="card">
              <h2>Analysis</h2>
              <p className="card-text">Our AI helps you improve your game and get better.</p>
          </div>
          <div className="card">
              <h2>Insights</h2>
              <p className="card-text">Our AI helps you get drafted by the best teams in the NBA.</p>
          </div>
        </div>
       
      </main>
  );
}
