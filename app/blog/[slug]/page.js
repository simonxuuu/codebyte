import React,  {useContext} from "react";
import Link from "next/link";
import "../../../styles/globals.css";
import {GetSortedArticles,GetArticle} from '../../../lib/articles'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp
} from "@fortawesome/free-solid-svg-icons";

export default async function Home({params}) {

  const data = await GetArticle(params.slug);
 
  
  
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
    <div className="blogArticle">
        <Link href='/blog'><FontAwesomeIcon icon={faArrowUp} className="fa-xl" style={{
            color:'var(--darkGrey)'}}/></Link>
       <acticle className='blogContent' dangerouslySetInnerHTML={{__html:data.contentHTML}}></acticle>
      
    </div>
  );
}






