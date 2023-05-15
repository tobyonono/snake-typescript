import { useContext, useEffect, useState } from 'react';
import './board.css';
import { posIni, cols, rows } from '../const/consts'
import PanelStart from '../PanelStart';
import PanelPlayer from '../PanelPlayer';
import PanelEnd from '../PanelEnd';
import { SnakeContext } from '../SnakeContext/SnakeProvider';

interface Props {
  fnMove: () => void
}

const Board = ({ fnMove }: Props) => {
  const {snake, setSnake} = useContext(SnakeContext)
  const [pSnake, setPrevSnake] = useState<Snake | undefined>(undefined);
  const setNode = (id: string, color: string) => {
    const node = document.getElementById(id);
    if (node) node.className = (color);
  }

  const resetGame = () => {
    Array(rows).fill(1).forEach((eR, r) =>
      Array(cols).fill(1).forEach((eL, c) => setNode(`${r}:${c}`, 'bgColor'))
    )

    setSnake(() => {
      let newS: Snake = { ...posIni, phase: 0 }
      return newS;
    })
  }

  useEffect(() => {
    posIni.cells.forEach((cell: Coordinate) => {
      setNode(`${cell.row}:${cell.col}`, 'red');
    })

    if (snake.fruit) {
      setNode(`${snake.fruit.row}:${snake.fruit.col}`, 'green');
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setNode(`${snake.fruit.row}:${snake.fruit.col}`, 'green');

    if (pSnake?.fruit.col !== snake.fruit.col && pSnake?.fruit.row !== snake.fruit.row) {
      setNode(`${pSnake?.fruit.row}:${pSnake?.fruit.col}`, 'bgColor')
    }

    if (pSnake) {
      setNode(`${pSnake.cells[0].row}:${pSnake.cells[0].col}`, 'bgColor')
    }

    if (snake.cells.length > 0) {
      setNode(`${snake.cells[snake.cells.length - 1].row}:${snake.cells[snake.cells.length - 1].col}`, 'red')
    }

    if (snake.phase !== 1) {
      setNode(`${snake.fruit.row}:${snake.fruit.col}`, 'bgColor')

      snake.cells.forEach(
        (cell:Coordinate) => setNode(`${cell.row}:${cell.col}`, 'bgColor')  
      );
    }
    setPrevSnake(snake);
    // eslint-disable-next-line
  }, [snake])

  return (
    <div className='board4'>
      <div className='board3'>
        <div className='board2'>
          <div className='board1'>

            {snake.phase === 0 &&
              <PanelStart
                fnStart={fnMove}
              />
            }

            {snake.phase === 2 && <PanelPlayer/>}

            {snake.phase === 3 &&
              <PanelEnd
                snake={snake}
                resetGame={resetGame}
              />
            }

            {Array(rows).fill(1).map((exEl, r) =>
              <div key={r} className='row' >
                {Array(cols).fill(1).map((inEl, c) =>
                  <div key={`${r}:${c}`} id={`${r}:${c}`} className='empty'>  </div>
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
