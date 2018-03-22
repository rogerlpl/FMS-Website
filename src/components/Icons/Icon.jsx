import React from 'react'
import PropTypes from 'prop-types'

function Icon(props) {
    const{
        color,
        size,
    } = props
    
    return(
        <svg
            fill ={color}
            height={size}
            width={size}
            viewBox="0 0 32 32"
        >
            {props.children}
        </svg>
    )
}

Icon.propTypes = {
    color: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
}

export default Icon