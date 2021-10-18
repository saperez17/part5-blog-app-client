import * as React from 'react'

const CountContext = React.createContext()

function countReducer(state, action) {
    switch (action.type) {
    case 'increment': {
        return { ...state, count: state.count + 1 }
    }
    case 'decrement': {
        return { ...state, count: state.count - 1 }
    }
    case 'setCount': {
        return { ...state, customCount: action.payload || 10 }
    }
    default: {
        throw new Error(`Unhandled action type: ${action.type}`)
    }
    }
}
function CountProvider({ children }) {
    const [state, dispatch] = React.useReducer(countReducer, { count: 0, customCount:1 })
    // NOTE: you *might* need to memoize this value
    // Learn more in http://kcd.im/optimize-context
    const value = { state, dispatch }
    return <CountContext.Provider value={value}>{children}</CountContext.Provider>
}
function useCount() {
    const context = React.useContext(CountContext)
    if (context === undefined) {
        throw new Error('useCount must be used within a CountProvider')
    }
    return context
}
export { CountProvider, useCount }