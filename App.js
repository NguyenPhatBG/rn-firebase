/**
 * Nguyen Van Phat - Viet Yen - Bac Giang - Viet Nam
 * 
 */

import React, { Component } from 'react';
import { YellowBox } from 'react-native';
import Routes from './src/Routes';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'])

export default class App extends Component {
  render() {
    return <Routes />;
  }
}
