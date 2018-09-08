import {
    LOGIN_ATTTEMP,
    LOGIN_SUCCESS,
    LOGIN_FAILED
} from './actionTypes';
import firebase from '../firebase';
import { AsyncStorage } from 'react-native';

const DEFAULR_AVATAR = 'http://cdn.onlinewebfonts.com/svg/img_210318.png';

export const login = ({ username, avatar }) => {
    const userAvatar = avatar.length === 0 ? DEFAULR_AVATAR : avatar;
    return (dispatch) => {
        dispatch({ type: LOGIN_ATTTEMP });
        // Auth Annones
        firebase.auth().signInAnonymously()
            .then(resp => {
                const userId = resp.user.uid;               
                const user = {
                    id: userId,
                    username,
                    avatar: userAvatar
                };
                // Save profile
                firebase.database().ref(`users/${userId}`)
                    .set({ username, avatar: userAvatar })
                    .then(() => finishLogin(dispatch, user));
            });
    }
};

const finishLogin = (dispatch, user) => {
    AsyncStorage.setItem('user_info', JSON.stringify(user))
        .then(() => {
            dispatch({ type: LOGIN_SUCCESS, payload: user });
        })
}
