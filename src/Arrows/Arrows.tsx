import { CgArrowDown, CgArrowUp, CgArrowLeft, CgArrowRight } from 'react-icons/cg'
import './arrows.css'

const size:number = 50;

interface Props {
  setAppAxys: (key:string) => void
}

const Arrows = ({setAppAxys}:Props) => {

  return <div className="arrows">
    <div className="cell1" ></div>
    <CgArrowUp className="cellUp" size={size} onClick={() => setAppAxys('ArrowUp')}></CgArrowUp>
    <div className="cell2" ></div>  
    <CgArrowLeft  className="cellLeft" size={size} onClick={() => setAppAxys('ArrowLeft')}></CgArrowLeft>
    <div className="cell3" ></div>
    <CgArrowRight  className="cellRigth" size={size} onClick={() => setAppAxys('ArrowRight')}></CgArrowRight>  
    <div className="cell4" ></div>
    <CgArrowDown className="cellDown" size={size} onClick={() => setAppAxys('ArrowDown')}></CgArrowDown>
    <div className="cell5" ></div>
  </div>
}
export default Arrows
