import React, { Component } from 'react';
    import {
        StyleSheet,
        Text,
        View,
        Alert,
        Picker
    } from 'react-native';

import Board from './Board'

export default class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            squares: Game.fillSquares(),
            currentSquares: [],
            attempts: 0,
            boardSize: 4,
            itemRemains: 16
        };
    }

    handleSquareClick (i) {
        this.setSquare(this.state.squares[i]);
    }

    setSquare (square) {
        let newSquares = this.state.squares.slice(),
            newCurrentSquares = this.state.currentSquares.slice(),
            indexOfSquare = this.state.squares.indexOf(square);

        newSquares[indexOfSquare].active = "true";

        newCurrentSquares.push(newSquares[indexOfSquare]);

        this.setState({
            squares: newSquares,
            currentSquares: newCurrentSquares
        });
    }


    componentDidUpdate (prevProps, prevState) {
        let squares = this.state.squares.slice(),
            currentSquares = this.state.currentSquares.slice(),
            itemRemains = this.state.itemRemains,
            attempts = this.state.attempts;

        if (currentSquares.length === 2) {
            if (currentSquares[0].id === currentSquares[1].id) {
                squares[squares.indexOf(currentSquares[0])].opened = true;
                squares[squares.indexOf(currentSquares[1])].opened = true;
                itemRemains -= 2;
            }
            squares[squares.indexOf(currentSquares[0])].active = false;
            squares[squares.indexOf(currentSquares[1])].active = false;

            attempts++;

            currentSquares = [];

            setTimeout(() => {
                this.setState({
                    squares: squares,
                    currentSquares: currentSquares,
                    itemRemains: itemRemains,
                    attempts: attempts
                });
            }, 200);
        }
    }

    static fillSquares (boardSize = 4)  {
        let newIds = [];
        let squares = [];

        while (squares.length < Math.pow(boardSize, 2)) {
            let nextId = Game.getRandomInt(1, Math.pow(boardSize, 2) / 2);
            if (~newIds.indexOf(nextId)) continue;

            newIds.push(nextId);
            let nextValue = { "id": nextId, src: 'img' + nextId};
            squares.push(nextValue,  Object.assign({}, nextValue));
        }

        Game.shuffle(squares);
        return squares;
    }

    static shuffle (a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    static getRandomInt (min, max) {
        return Math.floor(Math.random() * (max + 1 - min)) + min;
    }

    render () {
        return (
            <View style={styles.game} >
                <View className="game-navbar">
                    <Text>Board Size</Text>
                    <Picker
                        style={{width: 80}}
                        selectedValue={(this.state && this.state.boardSize.toString())}
                        onValueChange={(size) => {
                            this.setState({
                                boardSize: +size,
                                squares: Game.fillSquares(+size),
                                currentSquares: [],
                                attempts: 0,
                                itemRemains: Math.pow(+size, 2)
                            });

                        }}
                        >
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="6" value="6" />
                    </Picker>
                    {
                        this.state.itemRemains === 0 &&
                        Alert.alert(
                            'You won',
                            'Congratulations! New Game?',
                            [
                                {
                                    text: 'OK', onPress: () => {
                                        this.setState({
                                            squares: Game.fillSquares(this.state.boardSize),
                                            currentSquares: [],
                                            attempts: 0,
                                            itemRemains: Math.pow(this.state.boardSize, 2),
                                        });
                                    }},
                            ],
                            { cancelable: false }
                        )
                    }
                </View>
                {
                    this.state.squares.length &&
                    <View>
                        <Board
                            squares={this.state.squares}
                            boardSize={this.state.boardSize}
                            onClick={(i) => this.handleSquareClick(i)}
                        />
                        <View style={styles.gameInfo}>
                            <Text>Attempts: {this.state.attempts}</Text>
                        </View>
                    </View>
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    game: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    gameInfo: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});