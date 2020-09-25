import React, {Component} from 'react'
import VideoGame from './VideoGame'
import CreateVG from './CreateVG'

const API_URL = process.env.REACT_APP_API_URL

export default class extends Component {

    state = {
        videoGames: []
    }
    
    getVideoGames = () => {
        fetch(`${API_URL}video-games`)
        .then(response => response.json())
        .then(videoGames => this.setState({videoGames}))
    }

    componentDidMount(){
        this.getVideoGames()
    }

    render() {
        const displayGames = this.state.videoGames.map(game =>
            <VideoGame game={game} 
            key={game._id}
            refresh={this.getVideoGames}/>)
        
        return (
            <div className="app-body">
                <h1>Video Games</h1>
                <CreateVG refresh={this.getVideoGames}/>
                {displayGames}
            </div>
        )
    }
}