import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableHighlight,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Keyboard
} from 'react-native';
import { Header } from 'react-native-elements';
import ChatItem from './ChatItem';

export default class Chat extends Component {
    constructor() {
        super();
        this.state = {
            text: '',
            disabled: true,
            messages: [
                {
                    id: 1,
                    text: 'Hello',
                    author: {
                        id: 1,
                        avatar: 'http://cdn.onlinewebfonts.com/svg/img_210318.png',
                        username: 'Vk.Phuong'
                    }
                },
                {
                    id: 2,
                    text: 'How are you?',
                    author: {
                        id: 2,
                        avatar: 'http://cdn.onlinewebfonts.com/svg/img_210318.png',
                        username: 'Ck.Phat'
                    }
                },
            ]
        };
    }
    onTyping = (text) => {
        if (text && text.length >= 2) {
            this.setState({ disabled: false, text });
        } else {
            this.setState({ disabled: true });
        }
    }

    onSendBtnPressed() {       
        const messages = this.state.messages;
        const newMessage = {
            text: this.state.text,
            author: {
                id: 2,
                avatar: 'http://cdn.onlinewebfonts.com/svg/img_210318.png',
                username: 'Ck.Phat'
            }
        };
        messages.unshift(newMessage);
        this.setState({ messages });
        this.textInput.clear();
        Keyboard.dismiss();
    }

    _renderChatItem = ({ item, index }) => {
        return <ChatItem message={item} />
    }

    _keyExtractor = (item, index) => index.toString();

    render() {
        const extraBtnStyle = this.state.disabled ? styles.disabledBtn : styles.enabledBtn;
        let behavior = '';
        if (Platform.OS === 'ios') {
            behavior = 'padding'
        } else {
            behavior = undefined
        }
        return (
            <View style={styles.container}>
                <Header centerComponent={{ text: 'Chat Room', style: { color: '#FFF', fontSize: 20 } }} />
                <FlatList
                    data={this.state.messages}
                    renderItem={this._renderChatItem}
                    keyExtractor={this._keyExtractor}
                    inverted
                />
                <KeyboardAvoidingView behavior={behavior}>
                    <View style={styles.inputBar}>
                        <TextInput
                            style={styles.textBox}
                            underlineColorAndroid={'transparent'}
                            multiline
                            defaultHeight={30}
                            onChangeText={text => this.onTyping(text)}
                            ref={input => { this.textInput = input; }}
                        />
                        <TouchableHighlight
                            style={[styles.btnSend, extraBtnStyle]}
                            disabled={this.state.disabled}
                            onPress={this.onSendBtnPressed.bind(this)}
                        >
                            <Text style={{ color: 'white' }}>Send</Text>
                        </TouchableHighlight>
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    inputBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 10,
        backgroundColor: '#dadfea'
    },
    textBox: {
        flex: 1,
        marginLeft: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
        fontSize: 14,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    btnSend: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        paddingVertical: 10,
        borderRadius: 5,
        marginLeft: 5
    },
    enabledBtn: {
        backgroundColor: '#476DC5'
    },
    disabledBtn: {
        backgroundColor: '#89a9f4'
    }
});