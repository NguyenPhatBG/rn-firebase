import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';

export default class ChatItem extends Component {
    showAvatarOrNot(message) {
        if(message.author.id !== 2) return <Avatar source={{ uri: message.author.avatar }} small rounded />;
        return <View/>;
    }
    render() {
        const { message } = this.props;
        const isMyMessage = message.author.id === 2;
        const textContainerExtra = isMyMessage ? styles.textContainerRight : styles.textContainerLeft;
        return (
            <View style={styles.messageContainer}>
                {this.showAvatarOrNot(message)}                
                <View style={[styles.textContainer, textContainerExtra]}>
                    <Text style={styles.sender}>{message.author.username}</Text>
                    <Text style={styles.message}>{message.text}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    messageContainer: { flexDirection: 'row', padding: 20 },
    textContainer: { flexDirection: 'column', marginLeft: 10, flex: 1, borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5 },
    textContainerLeft: {
        alignItems: 'flex-start',
        backgroundColor: '#d5d8d4'
    },
    textContainerRight: {
        alignItems: 'flex-end',
        backgroundColor: '#66db30' 
    },
    message: { fontSize: 16 },
    sender: { fontWeight: 'bold', paddingRight: 10 }
});