import './footer.css'
import { SiInstagram } from 'react-icons/si'
import { AiFillGithub } from 'react-icons/ai'
import { SiYoutube } from 'react-icons/si'
import { detectMob } from '../utils/isMobile'

const Footer = () => {
  const logoSize: number = 15;

  return <div className='footer'>
    <a href='https://www.instagram.com/archy.moor/' target='_blank' rel='noreferrer' >
      <SiInstagram size={logoSize} />

    </a>

    <a href='https://orcd.co/dsfyd-archymoor' target='_blank' rel='noreferrer' >
      <span>PRE-SAVE</span>
    </a>

    <a href='https://youtube.com/@archymoor' target='_blank' rel='noreferrer' >
      <SiYoutube size={logoSize} />
    </a>

  </div>
}
export default Footer