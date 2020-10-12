import React from 'react';
import { shadowbtn, icon } from '../global.module.scss'
import HeartOutline from "../assets/heart-shape-outline.svg";
import HeartSilhouette from "../assets/heart-shape-silhouette.svg";

const HeartEmpty =  ({ click }) => <button className={shadowbtn} onClick={click}><div className={icon} style={{backgroundImage: `url(${HeartOutline}`}}></div></button>
const HeartFull = ({ click }) => <button className={shadowbtn} onClick={click}><div className={icon} style={{backgroundImage: `url(${HeartSilhouette}`}}></div></button>

const Checker = ({ isChecked, onChange }) => (
    <>
        { isChecked ? <HeartFull click={onChange} /> : <HeartEmpty click={onChange} /> }
    </>
)

export default Checker;