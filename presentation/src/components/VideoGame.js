import React, {useState} from 'react'
import UpdateVG from './UpdateVG'

const API_URL = process.env.REACT_APP_API_URL

const VideoGame = ({game, refresh}) => {
    
    const [open, setOpen] = useState(false)

    const handleDeleteGame = () => {
        fetch(`${API_URL}video-games/${game._id}`, {
            method: 'DELETE'
        })
        .then(refresh)
    }
    
    function toggleOpen () {setOpen(!open)}
    const displayUpdate = open ?
        <fieldset>
            <UpdateVG game={game} refresh={refresh} close={toggleOpen}/>
        </fieldset> : '';

    return (
        <div>
            <span className='game-name'>{game.name}</span>
            <button className='edit' onClick={toggleOpen}>Edit</button>
            <button className='del-btn' onClick={handleDeleteGame}>X</button>
            {displayUpdate}
        </div>
    )
}

export default VideoGame