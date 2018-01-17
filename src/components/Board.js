import React, { Component } from 'react';

import {
    Image,
    StyleSheet,
    View,
    Text
} from 'react-native';

import Square from './Square';

export default class Board extends Component {
    renderSquare (i) {
        return (
            <Square value={this.props.squares[i]}
                    onClick={() => this.props.onClick(i)}
                    key={i}/>
        );
    }

    fillRender () {
        let rows = [];
        let count = 0;
        for (let i = 0;i < this.props.boardSize; i++) {
            let rowItems = [];
            for (let i = 0; i < this.props.boardSize; i++) {
                rowItems.push(this.renderSquare(count++));
            }
            rows.push(<View style={styles.boardRow} key={i}>
                {rowItems}
            </View>);
        }
        return rows;
    }


    render () {
        return (
            <View style={styles.board}>
                {this.fillRender()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    boardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    board: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});
