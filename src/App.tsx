import { useEffect, useState } from 'react';
import './App.css';
import Board from "./Board";
import { posIni, COLS, ROWS, speeds } from "./const/const";
import ScoreItem from "./ScoreItem";
import {TbTrophy} from 'react-icons/tb'
import PanelStart from "./PanelStart";

function App() {
  const [axys, setAxys] = useState<IAxys>({ row: 0, col: 1 })
  const [snake, setSnake] = useState<ISnake>(posIni)

  const nextFruit = (cells:ICoordinate[]) => {
    let pos: ICoordinate;
    do {
      pos = {
        row: Math.floor( Math.random() * ROWS),
        col: Math.floor( Math.random() * COLS)
        }
      } while ( cells.find( e => e.col !== pos?.col && e.row === pos?.row) !== undefined )
      return pos;
  }

  useEffect(() => {    
    window.addEventListener("keydown", (key: KeyboardEvent) => {
      let newAxys:IAxys = {row:0, col:0};
      if( ( key.key === "ArrowLeft"  && axys.col ===  1) ||
          ( key.key === "ArrowRight" && axys.col === -1) ||
          ( key.key === "ArrowUp"    && axys.row ===  1) ||
          ( key.key === "ArrowDown"  && axys.row === -1)      
      ) return
      
      switch (key.key) {
        case ("ArrowUp"):{
          newAxys = {row:-1, col:0};
          break
        }
        case "ArrowDown":{
          newAxys = {row:1, col:0};
          break
        }
        case "ArrowLeft":{
          newAxys = {row:0, col:-1};
          break
        }
        case "ArrowRight":{
          newAxys = {row:0, col:1};
          break
        }
      }
      setAxys( prev => {
        prev.row =  newAxys.row;
        prev.col =  newAxys.col;
        return prev;
      });  
    });
  }, [])

  const move = (spd:number) => { 
    const id:any = setInterval( 
      () => pushSnake(), speeds[spd]
    )
    setSnake({...snake, idTimer:id})

    return () => clearInterval(id);
  }

  const stop = () => {
    clearInterval(snake.idTimer)
  }
  
  const pushSnake = () => {
    setSnake( oldS => {
      let newSnake:ISnake;

      let nextCell: ICoordinate = { 
        row: oldS.cells[oldS.cells.length - 1].row + axys.row, 
        col: oldS.cells[oldS.cells.length - 1].col + axys.col
      }       
      
      if (nextCell.row < 0      || 
          nextCell.row > ROWS-1 || 
          nextCell.col < 0      ||
          nextCell.col > COLS-1 ||
          oldS.cells.find( e => e.col === nextCell.col && e.row === nextCell.row) !== undefined  
        ) {
        oldS.endGame = true;
        
        clearInterval(oldS.idTimer);

        if (oldS.cells.length-3 > oldS.maxScore.value){
          oldS.maxScore.value = oldS.cells.length-3
        }
      }
      
      if (nextCell.col === oldS.fruit.col && nextCell.row === oldS.fruit.row  ) {
        newSnake = {
          ...oldS,
          cells:[...oldS.cells, nextCell], 
          fruit: nextFruit(oldS.cells),
        };              
      } else {
        newSnake = {
          ...oldS,
          cells:[...oldS.cells.slice(1), nextCell],
        };          
      }
      return newSnake;
    })        
  }

  return (
    <div className="App">
      
      <PanelStart
        fnStart={ () => move(0)}
      />
      
      <div className="placar">
        <ScoreItem
          description="Points:"
          value={`0`.repeat(4-``
          .concat(`${snake.cells.length-3}`).length)
          .concat(`${(snake.cells.length-3)*10}`)}
          >
        </ScoreItem>
      
        <ScoreItem
          description={""}
          value={`0`.repeat(4-``
          .concat(`${snake.maxScore.value }`).length)
          .concat(`${(snake.maxScore.value)}`)}
          >
          <TbTrophy size={'25px'} />
        </ScoreItem>
      </div>

      <Board
        snake={snake}
      />
    </div>
  );
}

export default App;
