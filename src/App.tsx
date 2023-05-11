import { useContext, useEffect, useState } from 'react'
import './App.css'
import Board from "./Board"
import {cols, rows, getNextFruit, speeds } from "./const/consts"
import ScoreItem from "./ScoreItem"
import { TbTrophy } from 'react-icons/tb'
import {SnakeContext} from './SnakeContext/SnakeProvider'
import { getNewAxys } from "./utils/keyboardEvents"
import Footer from "./Footer/Footer"
import useSwipe from "./utils/mySwipe"

const App = () => {
  const [axys, setAxys] =  useState<Axys>({row:0, col:1})
  const {snake, setSnake} = useContext(SnakeContext)

  const swipeHandlers = useSwipe({ 
    onSwipedRight: () => setAppAxys('ArrowRight'),
    onSwipedLeft: () => setAppAxys('ArrowLeft'),
    onSwipedUp: () => setAppAxys('ArrowUp'),
    onSwipedDown: () => setAppAxys('ArrowDown'),
  });

  const nextFruit = (cells: Coordinate[]) => {
    let pos: Coordinate
    do {
      pos = getNextFruit()
      // eslint-disable-next-line
    } while (cells.find(e => e.col !== pos.col && e.row === pos.row) !== undefined)
    return pos;
  }

  useEffect(() => {
    window
      .addEventListener("keydown", 
      (key: KeyboardEvent) => setAppAxys(key.key)
    );
    // eslint-disable-next-line
  }, [])
  
  const setAppAxys = (key:string) => {
    let newAxys:Axys = getNewAxys(key, axys) 
    setAxys( oldAx => {
      oldAx.row =  newAxys.row;
      oldAx.col =  newAxys.col;
      return oldAx;
    });  
  }

  const pushSnake = () => {
    setSnake((oldS:Snake) => {
      let newSnake: Snake;

      let nextCell: Coordinate = {
        row: oldS.cells[oldS.cells.length - 1].row + axys.row,
        col: oldS.cells[oldS.cells.length - 1].col + axys.col
      }

      if (nextCell.row < 0 ||
        nextCell.row > rows - 1 ||
        nextCell.col < 0 ||
        nextCell.col > cols - 1 ||
        oldS.cells.find(e => e.col === nextCell.col && e.row === nextCell.row) !== undefined
      ) {

        oldS.phase = 2;

        clearInterval(oldS.idTimer);
        newSnake = {...oldS}
        return newSnake
      }
      
      let speedIndex = 0

      if (nextCell.col === oldS.fruit.col && nextCell.row === oldS.fruit.row) {
        speedIndex = oldS.cells.length - 2
        newSnake = {
          ...oldS,
          cells: [...oldS.cells, nextCell],
          fruit: nextFruit(oldS.cells),
        };
      } else {
        speedIndex = oldS.cells.length - 3
        newSnake = {
          ...oldS,
          cells: [...oldS.cells.slice(1), nextCell],
        };
      }     
      
      if (speedIndex>10) speedIndex = 10 //Speed limit
      const id = setTimeout(() => pushSnake(), speeds[speedIndex])
      newSnake.idTimer = id
      return newSnake;
    })
  }

  const move = () => {

    setAxys( oldAx => {
      oldAx.row = 0
      oldAx.col = 1
      return oldAx;
    });  

    const id = setTimeout(() => pushSnake(), speeds[0])
      
    setSnake((oldS:Snake) => {
      return {...oldS, phase:1, idTimer:id};
    })

    return () => clearInterval(id);
  }

  return <div className="App" {...swipeHandlers}>

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
    <Footer/>

  </div>

}

export default App;
