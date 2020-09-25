import React from 'react'

const API_URL = process.env.REACT_APP_API_URL

const VideoGame = ({game, refresh}) => {
    const handleDeleteGame = () => {
        fetch(`${API_URL}video-games/${game._id}`, {
            method: 'DELETE'
        })
        .then(refresh)
    }
    
    return (
        <div>
            <span className='game-name'>{game.name}</span>
            <button className='del-btn'
            onClick={handleDeleteGame}>X</button>
        </div>
    )
}

export default VideoGame