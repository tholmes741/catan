import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import * as gameData from './gameData.json';

export const Games = new Mongo.Collection('games');

Meteor.methods({
    'games.insert'(player2) {
        check(player2, String);

        if (!this.userId) {
            throw new Meteor.Error('not-authorized', 'reason number 1');
        }

        player2 = Meteor.users.findOne({username: player2, _id: {$ne: this.userId}});
        if (!player2) {
            throw new Meteor.Error('invalid-user', 'user doesn\'t exist');
        }

        let board = gameData.tiles.slice();
        for (let i = board.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [board[i], board[j]] = [board[j], board[i]];
        }

        let numbers  = gameData.rolls.slice();
        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }

        const resources = {
            brick: 0,
            ore: 0,
            sheep: 0,
            wheat: 0,
            wood: 0
        };

        let game = {
            player1: {
                id: this.userId,
                resources: resources,
                developmentCards: [],
                placedTowns: [],
                towns: 5,
                cities: 4,
                roads: 15
            },
            player2: {
                id: player2._id,
                resources: resources,
                developmentCards: [],
                placedTowns: [],
                towns: 5,
                cities: 4,
                roads: 15
            },
            totalPlayers: 2,
            currentPlayer: 1,
            rolls: [],
            board: board, //the order of the tiles will be generated and placed in here
            numbers: numbers,
            robber: board.indexOf(5),
            initializing: true,
            createdOn: new Date(),

        }
        Games.insert(game);
    },
    // 'games.endTurn'(gameId) {
    //     check(gameId, String);

    //     let game = Games.findOne({_id: gameId});
    //     if (!game) {
    //         throw new Meteor.Error('invalid-game', 'reason number 1');
    //     }

    //     if (this.userId !== game['player' + game.currentTurn].id) {
    //         throw new Meteor.Error('invalid-user-action', 'not user\'s turn');
    //     }

    //     const roll = [Math.floor(Math.random() * 6 + 1), Math.floor(Math.random() * 6 + 1)];

    // },
    // 'games.placeTown'(gameId, x, y) {
    //     check(gameId, String);
    //     check(x, Number);
    //     check(y, Number);


    //     let game = Games.findOne({_id: gameId});
    //     if (!game) {
    //         throw new Meteor.Error('invalid-game', 'reason number 1');
    //     }

    //     if (this.userId !== game['player' + game.currentPlayer].id) {
    //         throw new Meteor.Error('invalid-user-action', 'not user\'s turn');
    //     }

    //     if (!gameData.vertices.some(vertex => x === vertex[0] && y === vertex[1])) {
    //         throw new Meteor.Error('invalid-vertex', 'not a vertex');
    //     }

    //     let resources = game['player' + game.currentPlayer].resources;
    //     if (!game.initializing) {
    //         //check resources
    //         if (resources.brick > 0 && resources.sheep > 0 && resources.wheat > 0 && resources.wood > 0) {
    //             resources.brick--;
    //             resources.sheep--;
    //             resources.wheat--;
    //             resources.wood--;
    //         } else {
    //             throw new Meteor.Error('insufficient-resources', 'you need at least one brick, sheep, wheat, and wood');
    //         }
    //     }

    //     //check to initializing
    //     // let initializing = game.initializing;

    //     const towns = game.player1.placedTowns.concat(game.player2.placedTowns);

    //     let address;
    //     for (let neighbor of gameData.neighbors) {
    //         address = [x + neighbor[0], x + neighbor[1]];

    //         for (let town of towns) {
    //             if (address[0] === town[0] && address[1] === town[1]) {
    //                 throw new Meteor.Error('invalid-vertex', 'can\'t place next to another town or city');
    //             }
    //         }
    //     }

        
    //     Games.update(gameId, {
    //         // $set: {'': 'some tother '}
    //     })
    // }
});
