
import { Gradient } from "whatamesh";
import React,  {useContext} from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import styles from "../page.module.css";


import GradientBlogBackground from './gradientblogBG'
import {GetSortedArticles} from '../../lib/articles'

export default function Home() {

  
 
  const articles = GetSortedArticles();
  console.log('h',articles);
  
  function formatDateCustom(dateStr) {
    const [month, day, year] = dateStr.split('-');
    
    // Create a new Date object
    const date = new Date(year, month - 1, day);
    
    // Define month names
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    // Format the date manually
    const formattedDate = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    
    return formattedDate;
}
  
  return (
    <section id='blogPage'>
       <GradientBlogBackground/>
      <div
      
        className="blogHolder"
        
      >
        <h1 style={{textAlign:'left',alignSelf:'start', maxWidth:'fit-content',margin:0,fontSize:'2em',color:'var(--light)',fontStyle:'italic',marginBottom:'1em'}}>
            Recently posted
          </h1>
          {articles !== null &&
          Object.keys(articles).map((article,index) => (
            <Link href={`/blog/${articles[index].id}`} key={index} className="blogPost">
            <div style={{display:'flex',justifyContent:'space-between',width:'100%',
              paddingRight:'2em',
              alignItems:'center',gap:'0',margin:0
            }}>
              <h1 style={{textAlign:'left',maxWidth:'fit-content',margin:0,fontSize:'2.4em'}}>
                {articles[index].title}
              </h1>
              <h3 style={{textAlign:'left',maxWidth:'fit-content',fontSize:'1.2em',color:'var(--darkGrey)'}}>
              {formatDateCustom(articles[index].date)}
              </h3>
            </div>
            <div className='blogBottomPart'>
              <h2 style={{textAlign:'left',maxWidth:'fit-content',margin:0,fontSize:'1.2em',fontWeight:300,marginTop:'0.25em'}}>
              {articles[index].description}
              </h2>
              <Image className='blogImg' alt={''} src={`${articles[index].coverImage}`}
          width={400}
          height={400}/>
           </div>
           </Link>
          ))}
      
        
        

  
          </div>
          

          
       
      
      
      
    </section>
  );
}






