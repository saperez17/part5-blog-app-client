/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useContext } from 'react'

import { MusicPlayerProvider, MusicPlayerContext, useMusicPlayer } from '../Context/MusicPlayerContext'

const TrackControl = () => {
    const { playTrack, togglePlay, currentTrackName, trackList, isPlaying } = useMusicPlayer()
    return(
        <>
            {trackList.map((track, index) => (
                <div>
                    <button onClick={() => playTrack(index)}>
                        {currentTrackName === track.name && isPlaying ? <span>pause</span> : <span>play</span> }
                    </button>
                    <div>
                        {track.name}
                    </div>
                </div>
            ))}
        </>
    )
}

const Tracklist = () => {
    return(
        <MusicPlayerProvider>
            <TrackControl />
        </MusicPlayerProvider>
    )
}

export default Tracklist