"use client";
import "../dashboard.css";
import { useState, useEffect, useContext } from "react";
import LeaderboardTableComponent from "./leaderboardTableComponent"
import { useRouter } from "next/navigation";
import { AppContext } from "../../appContext";



const Courses = () => {
  const router = useRouter();
  const appContext = useContext(AppContext);
  const [data, setData] = useState([]);
 
  useEffect(() => {
    appContext.getLeaderboard().then((result) => {
      const temp = new Array(25).fill(null);
      
      for(let i = 0; i<result.length;i++){
        temp[i] = result[i];
      }
      setData(temp);
    });
  }, []);
  return (
   
      <div className="flex lg:flex-row flex-col">
        <div className="md:p-8 p-4 ">
          
          <h2 className="my-6 text-2xl font-medium text-zinc-200">
            Leaderboard
          </h2>
          
          <div style={{marginBottom:'200px'}}className="leaderboardTable">
            {data &&
              data.map((dataItem,index) => (
                <LeaderboardTableComponent
                  
                  key={index}
                  index={index}
                  data={dataItem}
                 
                />
              ))}
          </div>

          

          

           
        </div>
       
        
      </div>
    
  );
};

export default Courses;
