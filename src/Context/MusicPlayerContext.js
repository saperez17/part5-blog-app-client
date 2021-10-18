/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react'

const MusicPlayerContext = React.createContext([{}, () => {}])

const MusicPlayerProvider = (props) => {
    const [state, setState] = useState({
        tracks: [
            {
                name: 'Lost Chameleon - Genesis',
            },
            {
                name: 'The Hipsta - Shaken Soda',
            },
            {
                name: 'Tobu - Such Fun',
            },
        ],
        currentTrackIndex: null,
        isPlaying: false,
    })
    return (
        <MusicPlayerContext.Provider value={[state, setState]}>
            {props.children}
        </MusicPlayerContext.Provider>
    )
}

const useMusicPlayer = () => {
    const [state, setState] = useContext(MusicPlayerContext)

    function playTrack(index){
        if (index === state.currentTrackIndex){
            togglePlay()
        }else{
            setState( state => ({ ...state, currentTrackIndex:index, isPlaying:true }))
        }
    }
    function togglePlay(){
        setState( state => ({ ...state, isPlaying: !state.isPlaying }))
    }

    return {
        playTrack,
        togglePlay,
        currentTrackName: state.currentTrackIndex !== null && state.tracks[state.currentTrackIndex].name,
        trackList: state.tracks,
        isPlaying: state.isPlaying
    }
}

export { MusicPlayerContext,
    MusicPlayerProvider,
    useMusicPlayer ,
}