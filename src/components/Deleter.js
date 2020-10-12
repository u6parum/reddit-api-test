import React from 'react';
import { shadowbtn, icon, icon__small } from '../global.module.scss'
import CrossSign from "../assets/cross-sign.svg"

const Deleter = ({ onClick }) => (
    <button className={shadowbtn} onClick={onClick}><div className={[icon, icon__small].join(' ')} style={{backgroundImage: `url(${CrossSign}`}}></div></button>
)

export default Deleter;