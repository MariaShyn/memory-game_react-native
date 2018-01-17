import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import React, { Component } from 'react';
import Game from '../components/Game'

export default class NewGameScreen extends Component {
    static navigationOptions = {
        title: 'Memory Game',
    };
    render() {
        const { params } = this.props.navigation.state;
        return (
            <Game/>
        );
    }
}