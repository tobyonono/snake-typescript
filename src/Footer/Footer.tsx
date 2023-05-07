import './footer.css'
import {SiVercel} from 'react-icons/si'
import {AiFillGithub} from 'react-icons/ai'
import {SiFirebase} from 'react-icons/si'
import { detectMob } from "../utils/isMobile"

const Footer = () => {

  return <div className="footer">
    <a href="https://snake-typescript.vercel.app/" target="_blank" rel="noreferrer" >
      <span>Hosted by:</span>
      <SiVercel size={30} />
      {!detectMob() && 
        <span>Vercel</span>
      }     
    </a>

    <a href="https://snake-typescript.vercel.app/" target="_blank" rel="noreferrer" >
      <span>Data on:</span>
      <SiFirebase size={30} />
      {!detectMob() && 
        <span>Firebase</span>
      }     

    </a>

    <a href="https://github.com/walterfcarvalho/snake-typescript" target="_blank" rel="noreferrer" >
      <span>Source:</span>
      <AiFillGithub size={30} />
      {!detectMob() && 
      <span>Github</span>
      }     

    </a>

  </div>
}
export default Footer