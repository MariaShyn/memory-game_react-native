import React, { Component } from 'react';

import {
    Image,
    StyleSheet,
    View,
    TouchableWithoutFeedback,
    Animated
} from 'react-native';


export default class Square extends Component {
    constructor(props) {
        super(props);

        this.state = {
            triggeredScaleAnimation: false
        };

        this.onSquareClick = this.onSquareClick.bind(this);
        this.transformValue = new Animated.Value(0);
        this.scaleValue = new Animated.Value(1);
    }

    onSquareClick () {
        if ( this.props.value.opened || this.props.value.active) return;
        // console.warn(this.props);

        this.transformValue.setValue(0);
        Animated.timing(
            this.transformValue,
            {
                toValue: 180,
                duration: 200,
            }
        ).start();
        this.props.onClick();
    }

    componentDidUpdate (prevProps) {
        if (this.props.value.active) return;
        else if ( this.props.value.opened ) {
            if (!this.state.triggeredScaleAnimation) {
                this.animationScale();
                this.setState({triggeredScaleAnimation : true});
            }
            return;
        }
        Animated.timing(
            this.transformValue,
            {
                toValue: 0,
                duration: 200,
            }
        ).start();
    }

    animationScale () {
        this.scaleValue.setValue(1);
        Animated.timing(
            this.scaleValue,
            {
                toValue: 1.2,
                duration: 200,
            }
        ).start(() => {
            this.scaleValue.setValue(1.2);
            Animated.timing(
                this.scaleValue,
                {
                    toValue: 1,
                    duration: 200,
                }
            ).start();
        });
    }

    render () {
        let self = this;
        const spin = this.transformValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '0deg']
        });
        const scaleValue = this.scaleValue;
        this.backOpacity = this.transformValue.interpolate({ inputRange: [89, 90], outputRange: [0, 1] });
        const backAnimatedStyle = {
            opacity: this.backOpacity,
            transform: [{rotateY: spin}, {scale: scaleValue}]
        };
        return (
            <TouchableWithoutFeedback
                onPress={this.onSquareClick}>
                <View style={styles.square}>
                    <Animated.Image
                        resizeMode={'contain'}
                        style={[styles.squareImage, backAnimatedStyle]}
                        source={{ uri: self.props.value.src}}
                        alt={this.props.value.id}
                    />
                </View>
            </TouchableWithoutFeedback>
        )
    }
}



const styles = StyleSheet.create({
    square: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 55,
        width: 55,
        padding: 0,
        backgroundColor: '#fff',
        borderWidth: 1,
    },
    squareImage: {
        width: 50,
        height: 50,
    },
});