import { useEffect, useState } from 'react'
import './App.css'
import Board from "./Board"
import { posIni, COLS, ROWS, speeds } from "./const/consts"
import ScoreItem from "./ScoreItem"
import {TbTrophy} from 'react-icons/tb'

function App() {
  const [axys, setAxys] = useState<IAxys>({ row: 0, col: 1 })
  const [snake, setSnake] = useState<ISnake>(posIni)

  const nextFruit = (cells:ICoordinate[]) => {
    let pos: ICoordinate = {
        row: Math.floor( Math.random() * ROWS),
        col: Math.floor( Math.random() * COLS)
    }
    do {
      pos = {
        row: Math.floor( Math.random() * ROWS),
        col: Math.floor( Math.random() * COLS)
        }
        // eslint-disable-next-line
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
    // eslint-disable-next-line
  }, [])

  const move = (spd:number) => { 

    setSnake(oldS => {
      oldS.phase = 1
      console.log(oldS);
      return oldS;
    })
    
    console.log(snake);
    const id:any = setInterval( 
      () => pushSnake(), speeds[spd]
    )
    setSnake({...snake, idTimer:id})

    return () => clearInterval(id);
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
        oldS.phase = 2;
        
        clearInterval(oldS.idTimer);
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
      {/* { snake.phase == 0 &&
        <PanelStart
          fnStart={ () => move(0)}
        />
      } */}

      {/* { snake.phase == 2 &&
        <PanelPlayer
          snake={snake}
          setSnake={setSnake}
        />
      } */}


      <div className="placar">
        <ScoreItem
          description="Points:"
          value={snake.cells.length-3}
          >
        </ScoreItem>
      
        <ScoreItem
          description={""}
            value={snake.maxScore.value}
          >
          <TbTrophy size={'20px'} />
        </ScoreItem>
      </div>

      <Board
        snake={snake}
        setSnake={setSnake}
        fnMove={ move }
      />
    </div>
  );
}

export default App;
