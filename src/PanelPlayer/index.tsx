import React, { FormEvent, useState } from "react"
import './panelPlayer.css'
import { BiCheckDouble } from 'react-icons/bi'
import * as API from '../api'
import { saveToStorage } from "../const/consts"

interface Props {
  snake: ISnake,
  setSnake: React.Dispatch<React.SetStateAction<ISnake>>
}
const PanelPlayer = ({ snake, setSnake }: Props) => {
  const [name, setName] = useState<string>(snake.maxScore.nickName)

  const updateRecord = (newRec:IMaxScore) => {
    API
      .updateDocument(newRec.id, newRec)
      .then(res => saveToStorage(newRec))
  }

  const addRecord = (newRec:IMaxScore) => {
    API.addRecord(newRec)
      .then(res => {
        newRec.id = res.id
        saveToStorage(newRec);
      })
  }

  const registerRecord = () => {
    const newScore: IMaxScore = {...snake.maxScore, nickName:name}

    if (snake.cells.length - 3 > snake.maxScore.value) {
      newScore.value = snake.cells.length - 3
    }
   
    if (snake.cells.length - 3 > snake.maxScore.value) {
      newScore.id
      ? updateRecord(newScore)
      : addRecord(newScore)
    }
      
    setSnake( oldS => {
      const newS:ISnake = {...oldS}
      newS.phase = 3
      //      newS.maxScore = newScore;
      return newS;
    })
  }

  return <div className="panelPlayer">
    <span>Game Over
      {snake.maxScore.value < snake.cells.length - 3
        ? <strong> New Record </strong>
        : ""
      }
    </span>

    <div className="input-button">
      <div className="input-label">
        <span>Your nickName:</span>
        <input
          id="myInput"
          type="text"
          maxLength={10}
          minLength={3}
          value={name}
          onChange={(e: FormEvent<HTMLInputElement>) => setName(e.currentTarget.value)}
          autoFocus
        />
      </div>
      <button
        disabled={name?.length < 3}
        onClick={registerRecord}
      >
        <BiCheckDouble size={'25px'} />
      </button>
    </div>
  </div>
}
export default PanelPlayer
