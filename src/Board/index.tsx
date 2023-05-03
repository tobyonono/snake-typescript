import { useEffect, useState } from "react";
import './board.css';
import { posIni, ROWS, COLS, bgColor } from '../const/consts'
import PanelStart from "../PanelStart";
import PanelPlayer from "../PanelPlayer";
import PanelEnd from "../PanelEnd";

interface Props {
  snake: ISnake
  fnMove:(spd:number) => void
  setSnake: React.Dispatch<React.SetStateAction<ISnake>>
  // setAxys: React.Dispatch<React.SetStateAction<IAxys>>
}

const Board = ({setSnake, fnMove, snake}: Props) => {
  const [pSnake, setPrevSnake] = useState<ISnake | undefined>(undefined);

  const setNode = (id: string, color: string) => {
    const node = document.getElementById(id);
    if (node) node.style.backgroundColor = color;
  }

  const resetGame = () => {    
    Array(ROWS).fill(1).forEach( (elRow, r) =>
      Array(COLS).fill(1).forEach( (elCol, c) => setNode(`${r}:${c}`, bgColor))
    )

    setSnake( oldS => {
      let newS:ISnake = {...posIni, phase:0}

      return newS;
     })
  }

  useEffect(() => {
    posIni.cells.forEach((cell: ICoordinate) => {
      setNode(`${cell.row}:${cell.col}`, "red");
    })

    if (snake.fruit) {
      setNode(`${snake.fruit.row}:${snake.fruit.col}`, "green");
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setNode(`${snake.fruit.row}:${snake.fruit.col}`, "green");

    if (pSnake?.fruit.col !== snake.fruit.col && pSnake?.fruit.row !== snake.fruit.row) {
      setNode(`${pSnake?.fruit.row}:${pSnake?.fruit.col}`, bgColor)
    }

    if (pSnake) {
      setNode(`${pSnake.cells[0].row}:${pSnake.cells[0].col}`, bgColor)
    }

    if (snake.cells.length > 0) {
      setNode(`${snake.cells[snake.cells.length - 1].row}:${snake.cells[snake.cells.length - 1].col}`, "red")
    }

    setPrevSnake(snake);
    // eslint-disable-next-line
  },[snake])


  const callStartGame = () => {
    //setAxys({row:0, col:1})
    fnMove(0)
  }


  return (
    <div className="board4">
      <div className="board3">
        <div className="board2">
          <div className="board1">

            { snake.phase === 0 &&
              <PanelStart
                fnStart={ () => callStartGame()}
              />
            }

            { snake.phase === 2 &&
              <PanelPlayer
                snake={snake}
                setSnake={setSnake}
              />
            }

            { snake.phase === 3 &&  
              <PanelEnd
                snake={snake}
                resetGame={resetGame}
              />      
            }

            { Array(ROWS).fill(1).map((exEl, r) =>
              <div key={r} className="row" >
                {Array(COLS).fill(1).map((inEl, c) =>
                  <div key={`${r}:${c}`} id={`${r}:${c}`} className="empty">  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Board;
