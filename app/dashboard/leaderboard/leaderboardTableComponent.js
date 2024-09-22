import { useEffect, useState, useRef, useContext } from "react";


const LeaderboardTableComponent = ({
  index,data
}) => {
  
  
  return (
    <>
    {data && <div className="leaderboardTableComponent">
      <h1 className={`leaderboardTableComponentText ${index+1 == 1 ? 'first' : index+1 == 2 ? 'second' : index+1 == 3 ? 'third' : 'other'}`}>{index+1}</h1><h1 className="leaderboardTableComponentText">{data.email}</h1> <h1 className="leaderboardTableComponentText">{data.xp} xp</h1>
    </div>}
    {data==null && <div className="leaderboardTableComponent emptyTableComponent">
      <h1 className={`leaderboardTableComponentText empty`}>?</h1>
    </div>}
    </>
  );
};

export default LeaderboardTableComponent;
