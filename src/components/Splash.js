import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native';

export default class Splash extends Component {
    componentDidMount() {
        AsyncStorage.getItem('user_info')
            .then(user => {
                if(user) {
                    this.props.navigation.navigate('Chat');
                } else {
                    this.props.navigation.navigate('Login');
                }
            })                    
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#476dc5' }
});
