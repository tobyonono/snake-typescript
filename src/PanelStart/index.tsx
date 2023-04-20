import { useState } from "react"
import {BsPlayFill} from 'react-icons/bs'
import './panelStart.css'

interface Props {
  fnStart: () => void
}

const PanelStart = ({fnStart}:Props) => {
  const [show, setShow]= useState("");

  const doStart = () => {
    setShow("hiddenDiv");
    fnStart()
  }

  return <div className={`floatPanel ${show}`}>
    <span>Click</span>
    <button 
      onClick={doStart}
    > 
      <BsPlayFill size={'80px'} />
    </button>
    <span>to start</span>

  </div>  

}
export default PanelStart