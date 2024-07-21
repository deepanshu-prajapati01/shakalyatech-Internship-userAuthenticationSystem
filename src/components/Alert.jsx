import React from 'react'
import PropTypes from 'prop-types'

export default function Alert(props) {

    return (
        <>
            <div id="Alert" className={`alert alert-${props.alertColor} d-flex justify-content-center`} role="alert" style={{ opacity: props.opacity, transition: 'opacity 0.5s ease-out' }}>
                {props.alertText}
            </div>
        </>
    )
}


Alert.prototypes = {
    opacity: PropTypes.number.isRequired,
    alertText: PropTypes.string,
    alertColor: PropTypes.string
}

Alert.defaultProps = {
    opacity: 1,
    alertText: "Dismiss",
    alertColor: "info"
}