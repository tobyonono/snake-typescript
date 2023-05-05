import './footer.css'
import {SiVercel} from 'react-icons/si'
import {AiFillGithub} from 'react-icons/ai'

const Footer = () => {

  return <div className="footer">
    <a href="https://snake-typescript.vercel.app/" target="_blank" >
      <span>
        Hosted by:
      </span>
      <SiVercel size={30} />
    </a>

    <a href="https://github.com/walterfcarvalho/snake-typescript" target="_blank" >
      <span>Source Code:</span>
      <AiFillGithub size={30} />
    </a>

  </div>
}
export default Footer