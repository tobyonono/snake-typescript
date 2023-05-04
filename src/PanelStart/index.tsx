import {BsPlayFill} from 'react-icons/bs'
import './panelStart.css'

interface Props {
  fnStart: () => void
}

const PanelStart = ({fnStart}:Props) => {

  const doStart = () => {
    fnStart()
  }

  return <div className={`floatPanel`}>

    <div className="topPart">
      <span>Click</span>
        <BsPlayFill 
          onClick={doStart}
        size={'80px'} />
      <span>to start</span>
    </div>

    <span className="bottomPart"> Use Arrows to control </span>
  </div>  
}
export default PanelStart