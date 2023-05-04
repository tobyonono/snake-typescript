import { useEffect, useState } from "react"
import './panelEnd.css'
import * as API from '../api'
import * as Utils from '../utils'
import { TbReload } from 'react-icons/tb'

interface Props {
  snake:Snake;
  resetGame: () => void
}

const PanelEnd = ({snake, resetGame }: Props) => {
  const [ranking, setRanking] = useState<MaxScore[]>([])

  useEffect(() => {
    API.getRecords().then(res => setRanking(res)) 
    // eslint-disable-next-line
  }, [snake.phase === 3])

  const reloadSnake = () => {
    resetGame()
  }

return <div className="endPanel">
    <span className="title">Results</span>

    <div className="panel-content" >
      <div className="panel-content-l" >
        <span>
          <strong>You:</strong>
          {Utils.formatScore(snake.cells.length-3)}
        </span>
      </div>

      <div className="panel-content-r" >
        <ul>
          {ranking.map((el, idx) =>
            <li key={idx}>
              <span>{`${idx +1}º${el.nickName}`}:</span>
              <span>{ Utils.formatScore(el.value)}</span>
            </li>
          )}
        </ul>
      </div>
    </div>

    <TbReload size={'50px'}
      onClick={reloadSnake}
    />

  </div>
}
export default PanelEnd