import React from "react";
import './score.css'

interface Props {
  description:string
  value: string;
  children: React.ReactNode | undefined;
}

const ScoreItem = ({description, value, children}:Props) => {
  return <>
    {children}
    <span className="score">
      {description}{value}
    </span>  
  </>
}
export default ScoreItem;
