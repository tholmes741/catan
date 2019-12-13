import React, { Component } from 'react';
import GameData from './GameData.jsx';
import PlayerData from './PlayerData.jsx';
import Board from './Board.jsx'

// App component - represents the whole app
export default class App extends Component {
    render() {
        return (
            <div className="app-container">
                <header>
                    <h1>Lets get it!</h1>
                </header>

                <div className="row">
                    <GameData />
                    <Board />
                </div>

                <PlayerData />
            </div>
        );
    }
}