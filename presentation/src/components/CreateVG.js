import React, { Component } from 'react'

const API_URL = process.env.REACT_APP_API_URL

export default class CreateVG extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            type: '',
            genre: '',
            release: '',
            players: 0,
            consoles: [''],
            owned: false
        }
    }

    handleAddConsole = () => {
        const newConsoles = this.state.consoles.map(x => x)
        newConsoles.push('')
        this.setState({consoles: newConsoles})
    }

    handleRemoveConsole = (index) => {
        const newConsoles = this.state.consoles.map(x => x)
        newConsoles.splice(index, 1)
        this.setState({consoles: newConsoles})
    }

    handleSelectConsole = (value, index) => {
        const newConsoles = this.state.consoles.map(x => x)
        newConsoles[index] = value
        this.setState({consoles: newConsoles})
    }

    handleChange = ({target}) => {
        let value = target.type === 'checkbox' ? target.checked : target.value
        value = target.type === 'number' ? parseInt(value) : value
        this.setState({[target.name]: value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        fetch(`${API_URL}video-games`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(this.state)
        })
        .then(this.props.refresh)
        .then(() => this.setState({
            name: '',
            type: '',
            genre: '',
            release: '',
            players: 0,
            consoles: [''],
            owned: false
        }))
    }

    render() {

        const displayConsoles = this.state.consoles.map((console, index) => {
            return (
                <div className='option-form' key={index}>
                <select
                    value={this.state.consoles[index]}
                    onChange={({target}) => this.handleSelectConsole(target.value, index)}
                >
                    <option value=''>Select a Console</option>
                    <option value="xbox">Xbox</option>
                    <option value="xbox360">Xbox 360</option>
                    <option value="xbox1">Xbox One</option>
                    <option value="ps">PlayStation</option>
                    <option value="ps2">PlayStation 2</option>
                    <option value="ps3">PlayStation 3</option>
                    <option value="ps4">PlayStation 4</option>
                    <option value="nes">NES</option>
                    <option value="snes">SNES</option>
                    <option value="n64">N64</option>
                    <option value="gc">GameCube</option>
                    <option value="gb">GameBoy</option>
                    <option value="wii">Wii</option>
                    <option value="ds">DS</option>
                    <option value="switch">Switch</option>
                    <option value="pc">PC</option>
                    <option value="mobile">Mobile</option>
                </select>
                <input type='button' 
                    value='X' 
                    className='del-btn' 
                    onClick={() => this.handleRemoveConsole(index)}
                />
                </div>
            )
        })

        return (
            <form id='create' onSubmit={this.handleSubmit}>
                <input name='name' 
                    value={this.state.name}
                    type='text'
                    onChange={this.handleChange}
                    placeholder='Name of Game' 
                />
                <input name='type' 
                    value={this.state.type}
                    type='text'
                    onChange={this.handleChange}
                    placeholder='Type of Game' 
                />
                <input name='genre' 
                    value={this.state.genre}
                    type='text'
                    onChange={this.handleChange}
                    placeholder='Genre of Game' 
                />
                <div className="labelled">
                    <label htmlFor='release'>Release Date</label>
                    <input name='release' 
                        value={this.state.release}
                        type='date' 
                        onChange={this.handleChange}
                        placeholder='Release Date' 
                    />
                </div>
                <div className="labelled">
                    <label htmlFor='players'>Player Number</label>
                    <input name='players' 
                        value={this.state.players}
                        type='number' 
                        onChange={this.handleChange} 
                    />
                </div>
                {displayConsoles}
                <input type='button' 
                    value='Add Console' 
                    onClick={this.handleAddConsole}
                />
                <div>
                    <label htmlFor='owned'>Owned?</label>
                    <input name='owned' 
                        checked={this.state.owned}
                        type='checkbox' 
                        onChange={this.handleChange} 
                    />
                </div>
                <button>Add Game</button>
            </form>
        )
    }
}