/**
 * Nguyen Van Phat - Viet Yen - Bac Giang - Viet Nam
 * 
 */

import React, { Component } from 'react';
import { YellowBox } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import Routes from './src/Routes';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
console.ignoredYellowBox = [
  'Setting a timer'
];

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Routes />
      </Provider>
  );
  }
}
