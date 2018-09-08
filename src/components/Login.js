import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { FormLabel, FormInput, Header, Button } from 'react-native-elements';

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            avatar: '',
            disabled: true
        };
    }

    onUserNameChanged(userName) {
        if(userName && userName.length > 3) {
            this.setState({
                disabled: false,
                username: userName
            });
        } else {
            this.setState({
                disabled: true
            });
        }
    }

    onLoginPressed() {
        console.log(`'Username is: '${this.state.username} + "Avatar is: " ${this.state.avatar}`)
    }

    showBtnOrSpinner() {
        return (
            <Button 
                title="Join Chat"
                backgroundColor="#2195f3"
                disabled={this.state.disabled}
                onPress={this.onLoginPressed.bind(this)}
            />  
        )
    }

    render() {
        return (
            <TouchableWithoutFeedback style={styles.container} onPress={() => Keyboard.dismiss()}>
                <View style={styles.viewContainer}>
                    <Header centerComponent={{ text: 'Login', style: { color: '#FFF', fontSize: 20 } }} />
                    <FormLabel>Chat Name</FormLabel>
                    <FormInput 
                        placeholder='Select Chat Name' 
                        onChangeText={username => this.onUserNameChanged(username)}
                    />

                    <FormLabel>Chat Avatar</FormLabel>                
                    <FormInput 
                        placeholder='Leave it blank for default' 
                        onChangeText={avatar => this.setState({ avatar })}
                    />
                    <View style={styles.btnContainer}>
                      {this.showBtnOrSpinner()}
                    </View>                                     
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    viewContainer: { flex: 1 },
    btnContainer: { marginTop: 20 }
});