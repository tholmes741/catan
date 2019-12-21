import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Games } from '../api/games.js';
import GameData from './GameData.jsx';
import PlayerData from './PlayerData.jsx';
import Board from './Board.jsx'
import CreateGame from './CreateGame.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// App component - represents the whole app
class App extends Component {
    render() {
        let createGame;
        let game;
        if (this.props.currentUser && !this.props.game) {
            createGame = <div>
                <CreateGame />
            </div>;
        } else if (this.props.game) {

            game =<div>
                <div className="row">
                    <GameData game={this.props.game}/>
                    <Board game={this.props.game}/>
                </div>

                <PlayerData game={this.props.game}/>
            </div>;
        }
        return (
            <div className="app-container">
                <div className="login">
                    <AccountsUIWrapper />
                </div>

                {createGame}
                {game}
            </div>
        );
    }
}

export default withTracker(() => {
    let currentUser = Meteor.user();
    let game;
    if (currentUser) {
        game = Games.findOne({
            $or: [
                {'player1.id': Meteor.userId()},
                {'player2.id': Meteor.userId()},
            ]
        });
    }

    return {
        currentUser: Meteor.user(),
        game: game,
    };
})(App);