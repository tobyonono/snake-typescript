import { useEffect, useState } from "react";
import './board.css';
import { posIni, ROWS, COLS, bgColor } from '../const/const'

interface Props {
  snake: ISnake
}

const Board = ({ snake }: Props) => {
  const [pSnake, setPrevSnake] = useState<ISnake | undefined>(undefined);

  const setNode = (id: string, color: string) => {
    const node = document.getElementById(id);
    if (node) node.style.backgroundColor = color;
  }

  useEffect(() => {
    posIni.cells.forEach((cell: ICoordinate) => {
      setNode(`${cell.row}:${cell.col}`, "red");
    })

    if (snake.fruit) {
      setNode(`${snake.fruit.row}:${snake.fruit.col}`, "green");
    }
  }, [])

  useEffect(() => {
    setNode(`${snake.fruit.row}:${snake.fruit.col}`, "green");

    if (pSnake?.fruit.col !== snake.fruit.col && pSnake?.fruit.row !== snake.fruit.row) {
      setNode(`${pSnake?.fruit.row}:${pSnake?.fruit.col}`, bgColor)
    }

    if (pSnake) {
      setNode(`${pSnake.cells[0].row}:${pSnake.cells[0].col}`, bgColor)
    }

    setNode(`${snake.cells[snake.cells.length - 1].row}:${snake.cells[snake.cells.length - 1].col}`, "red")

    setPrevSnake(snake);
  },
    [snake])

  return (
    <div className="board4">
      <div className="board3">
        <div className="board2">
          <div className="board1">
            {Array(ROWS).fill(1).map((exEl, r) =>
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
