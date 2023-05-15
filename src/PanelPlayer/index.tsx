import { FormEvent, useContext } from 'react'
import './panelPlayer.css'
import { BiCheckDouble } from 'react-icons/bi'
import * as API from '../api'
import { saveToStorage } from '../const/consts'
import { SnakeContext } from '../SnakeContext/SnakeProvider'

const PanelPlayer = () => {
  const { snake, setSnake } = useContext(SnakeContext)

  const updateRecord = (newRec: MaxScore) => {
    API.updateDocument(newRec.id, newRec)
      .then( () => saveToStorage(newRec))
  }

  const addRecord = (newRec: MaxScore) => {
    API.addRecord(newRec)
      .then(res => {
        newRec.id = res.id
        saveToStorage(newRec);
      })
  }

  const registerRecord = () => {
    const newScore: MaxScore = { ...snake.maxScore }

    if (snake.cells.length - 3 > snake.maxScore.value) {
      newScore.value = snake.cells.length - 3
    }

    if (snake.cells.length - 3 > snake.maxScore.value) {
      newScore.id
        ? updateRecord(newScore)
        : addRecord(newScore)
    }

    setSnake((oldS: Snake) => {
      const newS: Snake = { ...oldS }
      newS.phase = 3
      //      newS.maxScore = newScore;
      return newS;
    })
  }

  const changeNickName = (e: FormEvent<HTMLInputElement>) => {
    setSnake((oldS: Snake) => {
      const newS: Snake = { ...oldS }
      newS.maxScore.nickName = e.currentTarget.value
      return newS
    })
  }

  return <div className='panelPlayer'>
    <span>Game Over
      {snake.maxScore.value < snake.cells.length - 3
        ? <strong> New Record </strong>
        : ''
      }
    </span>

    <div className='input-button'>
      <div className='input-label'>
        <span>Your nickName:</span>
        <input
          id='myInput'
          type='text'
          maxLength={10}
          minLength={3}
          value={snake.maxScore.nickName}
          onChange={changeNickName}
          autoFocus
        />
      </div>
      <button
        disabled={snake.maxScore.nickName.length < 3}
        onClick={registerRecord}
      >
        <BiCheckDouble size={'25px'} />
      </button>
    </div>
  </div>
}
export default PanelPlayer
