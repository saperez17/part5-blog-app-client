import React, { useState, useImperativeHandle } from 'react'
import { Button } from 'react-bootstrap'
import Proptypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toogleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toogleVisibility
        }
    })

    return(
        <div>
            <div style={hideWhenVisible}>
                <Button
                    onClick={() => toogleVisibility()}
                    className="mt-2 mb-2"
                >{props.buttonLabel}</Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <Button
                    onClick={() => toogleVisibility()}
                    variant="danger"
                >cancel</Button>
            </div>
        </div>
    )
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
    buttonLabel: Proptypes.string.isRequired
}

export default Togglable