import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableHighlight,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { sendMessage, fetchMessages } from './../actions';
import ChatItem from './ChatItem';

class Chat extends Component {
    constructor() {
        super();
        this.state = {
            text: '',
            disabled: true,
            messages: []
        };
    }

    componentDidMount() {
        this.props.fetchMessages();
    }

    showListOrSpinner = () => {
        if (this.props.fetching) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large"/>
                </View>
            );
        }
        return (
            <FlatList
                data={this.props.messages}
                renderItem={this._renderChatItem}
                keyExtractor={this._keyExtractor}
                inverted
            />
        )
    }

    onTyping = (text) => {
        if (text && text.length >= 2) {
            this.setState({ disabled: false, text });
        } else {
            this.setState({ disabled: true });
        }
    }

    onSendBtnPressed() {
        this.props.sendMessage(this.state.text, this.props.user);
        this.textInput.clear();
        Keyboard.dismiss();
    }

    _renderChatItem = ({ item, index }) => {
        return <ChatItem message={item} />
    }

    _keyExtractor = (item, index) => index.toString();

    logoutChatRoom = () => {
        AsyncStorage.removeItem('user_info');
        this.props.navigation.navigate('Login');
    }

    renderRightComponent() {
        return (
            <TouchableOpacity onPress={this.logoutChatRoom}>
                <Text style={{ color: 'white' }}>Logout</Text>
            </TouchableOpacity>
        )
    }

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
                <Header
                    leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'Chat Room', style: { color: '#fff' } }}
                    rightComponent={this.renderRightComponent()}
                />
                {this.showListOrSpinner()}
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

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        fetching: state.chat.fetching,
        messages: state.chat.messages
    };
}

export default connect(mapStateToProps, { sendMessage, fetchMessages })(Chat);