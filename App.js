/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import { StackNavigator } from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import NewGameScreen from './src/screens/NewGameScreen';

const NavigationApp = StackNavigator({
    Home: { screen: HomeScreen },
    NewGame: { screen: NewGameScreen }
});

export default class App extends Component<{}> {
  render() {
    return (
      <NavigationApp />
    );
  }
}
