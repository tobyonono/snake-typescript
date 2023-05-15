import './footer.css'
import {SiVercel} from 'react-icons/si'
import {AiFillGithub} from 'react-icons/ai'
import {SiFirebase} from 'react-icons/si'
import { detectMob } from '../utils/isMobile'

const Footer = () => {
  const logoSize:number = 30;

  return <div className='footer'>
    <a href='https://vercel.com' target='_blank' rel='noreferrer' >
      <span>Hosted by:</span>
      <SiVercel size={logoSize} />
      {!detectMob() &&<span>Vercel</span>}     
    </a>

    <a href='https://firebase.google.com/?hl=pt-br' target='_blank' rel='noreferrer' >
      <span>Data on:</span>
      <SiFirebase size={logoSize} />
      {!detectMob() && <span>Firebase</span>}     
    </a>

    <a href='https://github.com/walterfcarvalho/snake-typescript' target='_blank' rel='noreferrer' >
      <span>Source:</span>
      <AiFillGithub size={logoSize}/>{!detectMob() && <span>Github</span>}     

    </a>

  </div>
}
export default Footer