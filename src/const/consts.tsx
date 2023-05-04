export const COLS: number = 40 //50

export const ROWS: number = 25 //30

export const bgColor: string = '#C4CFA2'

export const speeds:number[] = [150]

export const getFromStorage = () => {  
  return JSON
  .parse(localStorage.getItem('snaky-score') ||
                              '{"value":0, "nickName": "player" }') as MaxScore 
}

export const saveToStorage = (maxScore: MaxScore) => localStorage
.setItem('snaky-score', JSON.stringify(maxScore)); 


export const getNextFruit = () => {
  let fruit:Coordinate = {
    row: Math.floor(Math.random() * ROWS),
    col: Math.floor(Math.random() * COLS)
  }
  return fruit
}

const cells: Coordinate[] = ([{row:5, col:16}, {row:5, col:17}, {row:5, col:18}]) 

export const posIni:Snake = ({
  phase: 0,
  maxScore: getFromStorage(),
  cells: cells, 
  fruit: getNextFruit(), 
  idTimer:0
}) 