
export const getFromStorage = () => {  
  return JSON
  .parse(localStorage.getItem('snaky-score') ||
                              '{"value":0, "nickName": "player" }') as IMaxScore 
}

export const saveToStorage = (maxScore: IMaxScore) => localStorage
.setItem('snaky-score', JSON.stringify(maxScore)); 

const cells: ICoordinate[] = ([{row:5, col:16}, {row:5, col:17}, {row:5, col:18}]) 

const fruit: ICoordinate = {row:5, col:25}

export const posIni:ISnake = ({
  phase: 0,
  maxScore: getFromStorage(),
  cells: cells, 
  fruit: fruit, 
  idTimer:0
}) 


export const COLS: number = 40 //50

export const ROWS: number = 25 //30

export const bgColor: string = '#C4CFA2'

export const speeds:number[] = [150]
