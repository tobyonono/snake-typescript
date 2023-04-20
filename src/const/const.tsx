
const cells: ICoordinate[] = ([{row:5, col:16}, {row:5, col:17}, {row:5, col:18}]) 

const fruit: ICoordinate = {row:5, col:25}

let strScore = localStorage.getItem('snaky-score');

let maxScore:IMaxScore =
JSON.parse(localStorage.getItem('snaky-score') ||  '{"value":0, "nickname": "" }') as IMaxScore;  

export const posIni:ISnake = ({
  endGame:false,
  cells, 
  fruit, 
  idTimer:0, 
  maxScore
}) 

export const COLS: number = 50

export const ROWS: number = 30

export const bgColor: string = '#C4CFA2'

export const speeds:number[] = [150]
