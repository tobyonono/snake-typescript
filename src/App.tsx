import { useContext, useEffect, useState } from 'react'
import './App.css'
import Board from "./Board"
import {COLS, ROWS, getNextFruit, speeds } from "./const/consts"
import ScoreItem from "./ScoreItem"
import { TbTrophy } from 'react-icons/tb'
import {UserContext} from './SnakeProvider'
import { getNewAxys } from "./utils/keyboardEvents"

const App = () => {
  const [axys, setAxys] =  useState<Axys>({row:0, col:1})
  const {snake, setSnake} = useContext(UserContext)

  const nextFruit = (cells: Coordinate[]) => {
    let pos: Coordinate
    do {
      pos = getNextFruit()
      // eslint-disable-next-line
    } while (cells.find(e => e.col !== pos.col && e.row === pos.row) !== undefined)
    return pos;
  }

  useEffect(() => {
    window.addEventListener("keydown", (key: KeyboardEvent) => {
      let newAxys:Axys = getNewAxys(key.key, axys) 

      setAxys( oldAx => {
        oldAx.row =  newAxys?.row;
        oldAx.col =  newAxys?.col;
        return oldAx;
      });  
    });
    // eslint-disable-next-line
  }, [])

  const pushSnake = () => {
    setSnake((oldS:Snake) => {
      let newSnake: Snake;

      let nextCell: Coordinate = {
        row: oldS.cells[oldS.cells.length - 1].row + axys.row,
        col: oldS.cells[oldS.cells.length - 1].col + axys.col
      }

      if (nextCell.row < 0 ||
        nextCell.row > ROWS - 1 ||
        nextCell.col < 0 ||
        nextCell.col > COLS - 1 ||
        oldS.cells.find(e => e.col === nextCell.col && e.row === nextCell.row) !== undefined
      ) {

        oldS.phase = 2;

        clearInterval(oldS.idTimer);
      }

      if (nextCell.col === oldS.fruit.col && nextCell.row === oldS.fruit.row) {
        newSnake = {
          ...oldS,
          cells: [...oldS.cells, nextCell],
          fruit: nextFruit(oldS.cells),
        };
      } else {
        newSnake = {
          ...oldS,
          cells: [...oldS.cells.slice(1), nextCell],
        };
      }
      return newSnake;
    })
  }

  const move = () => {

    setAxys( oldAx => {
      oldAx.row = 0
      oldAx.col = 1
      return oldAx;
    });  

    const id = setInterval(() => pushSnake(), speeds[0])
      
    setSnake((oldS:Snake) => {
      return {...oldS, phase:1, idTimer:id};
    })

    return () => clearInterval(id);
  }

  return <div className="App">
    <div className="placar">
      <ScoreItem
        description="Points:"
        value={snake.cells.length - 3}
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
      fnMove={move}
    />

      <div className="snake">
        <p>cells: {snake.cells.length}</p>
        <p>phase: {snake.phase} </p>

        <p>{axys.row}</p>
        <p>{axys.col}</p>

    </div>
  </div>
}

export default App;
