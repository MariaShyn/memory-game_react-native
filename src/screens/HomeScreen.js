import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    BackAndroid
} from 'react-native';
import React, { Component } from 'react';


export default class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Welcome',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.menu}>
                <TouchableWithoutFeedback
                    onPress={() => navigate('NewGame', { name: 'Jane' })}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>New Game</Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback
                    onPress={() => BackAndroid.exitApp()}>
                    <View style={[styles.button, styles.buttonLast]}>
                        <Text style={styles.buttonText}>Exit</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>


        );
    }
}

const styles = StyleSheet.create({
    menu: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#3f4442'
    },
    button: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
        backgroundColor: '#fff',
        marginBottom: 20,
        elevation: 3
    },
    buttonLast: {
        marginBottom: 0
    },
    buttonText: {
        fontSize: 25,
        color: '#000'
    }
});