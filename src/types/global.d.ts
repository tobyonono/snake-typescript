export {};

declare global {
  
  const COLS:number = 50
  const ROWS:number = 20
  
  interface IMaxScore {
    value:number;
    nickName:string
  }

  interface IAxys {
    row: 1|0|-1
    col: 1|0|-1
  }
  
  interface ICoordinate {
    row:number
    col:number
  }
  
  interface ISnake {
    endGame:boolean
    cells: ICoordinate[]
    fruit: ICoordinate
    idTimer:number
    maxScore:IMaxScore
  }
}
