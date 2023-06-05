export {};

declare global {
  
  const COLS:number = 50
  const ROWS:number = 20
  
  interface MaxScore  {
    id:string
    value:number
    nickName:string
    email:string
  }

  interface Axys  {
    row: 1|0|-1
    col: 1|0|-1
  }
  
  interface Coordinate  {
    row:number
    col:number
  }
  
  interface Snake  {
    phase: 0|1|2|3;
    cells: ICoordinate[]
    fruit: ICoordinate
    idTimer: NodeJS.Timeout
    maxScore:IMaxScore
  }

  interface AppData  {
    snake:ISnake | null,
    setSnake: (oldS:ISnake|null) => void
  }
}
