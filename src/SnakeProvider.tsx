import React, { useState } from "react";
import { posIni } from "./const/consts";

interface Props {
  children: React.ReactNode | undefined;
}

export const UserContext = React
.createContext<AppData>({
  snake:posIni, 
  setSnake: (oldS:Snake | null) => {} 
});

const SnakeProvider = ({children}:Props) => {
  const [snake, setSnake] = useState<Snake | null>({...posIni})

  return (
    <UserContext.Provider value={{snake, setSnake}}>
      {children}
    </UserContext.Provider>
  );
}

export default SnakeProvider