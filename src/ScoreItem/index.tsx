import React from "react";
import './scoreItem.css'
import * as Utils from '../utils/formatScore'

interface Props {
  description:string
  value: number;
  children: React.ReactNode | undefined;
}

const ScoreItem = ({description, value, children}:Props) => {
  return <div className="scoreRegion" >
    {children}
    <span className="score">
      {description}{ Utils.formatScore(value)}
    </span>  
  </div>
}
export default ScoreItem;
