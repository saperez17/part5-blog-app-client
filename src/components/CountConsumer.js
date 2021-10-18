/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useCount } from '../Context/CountContext'

const CountConsumer = () => {
    const { state, dispatch } = useCount()
    const [ customCount, setCustomCount ] = useState(0)
    useEffect (() => {
        setCustomCount(state.customCount)
    }, [ state ] )
    return(
        <div>
            <h1> { state.count } </h1>
            <h1> { state.customCount } </h1>
            <button onClick={() => dispatch({ type:'increment' })}> Increment </button>

            <div>
                <input type="text"
                    onChange={ ({ target }) => setCustomCount(target.value)}
                    value={customCount}
                />
                <button onClick={() => dispatch({ type:'setCount', payload:customCount })}> Set Count to {customCount} </button>
            </div>
        </div>
    )
}

export default CountConsumer