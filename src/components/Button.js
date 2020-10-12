import React, { useState } from 'react';
import { btn, btn__animated, btn__paused, btn__disabled } from './Button.module.scss'

const Button = ({ text, disabled, onClick }) => {
    const [paused, setPaused] = useState(false)

    return (
        <button
            className={[
                btn, 
                btn__animated,
                paused && btn__paused,
                disabled && btn__disabled
            ].join(' ')} 
            type="button"
            onClick={() => { !disabled && onClick(text) }} 
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {text}
        </button>
    )
}

export default Button;