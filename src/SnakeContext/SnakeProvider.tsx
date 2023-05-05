import React, { useState } from "react";
import { posIni } from "../const/consts";

interface Props {
  children: React.ReactNode | undefined;
}

export const SnakeContext = React
.createContext<AppData>({
  snake:posIni, 
  setSnake: (oldS:Snake | null) => {} 
});

const SnakeProvider = ({children}:Props) => {
  const [snake, setSnake] = useState<Snake | null>({...posIni})

  return (
    <SnakeContext.Provider value={{snake, setSnake}}>
      {children}
    </SnakeContext.Provider>
  );
}

export default SnakeProvider