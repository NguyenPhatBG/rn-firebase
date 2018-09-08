import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import { FormLabel, FormInput, Header, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { login } from '../actions';

class Login extends Component {
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

    componentWillReceiveProps(nextProps) {
        if(nextProps.user) {
            this.props.navigation.navigate('Chat');
        }
    }

    onLoginPressed() {
        const { username, avatar } = this.state;
        this.props.login({username, avatar});
    }

    showBtnOrSpinner() {
        if(this.props.loading) return <ActivityIndicator size="large" />
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

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        user: state.auth.user,
        loading: state.auth.loading
    };
}

export default connect(mapStateToProps, { login })(Login);