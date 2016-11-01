import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Scene, Router } from 'react-native-router-flux';

import LoginPage from './page/LoginPage';
import JoinPage from './page/JoinPage';
import HomePage from './page/HomePage';

const getSceneStyle = (props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 : 64;
    style.marginBottom = computedProps.hideTabBar ? 0 : 50;
  }
  return style;
};

class App extends Component {
  render() {
    return (
      <Router getSceneStyle={getSceneStyle}>
        <Scene key='login' component={LoginPage} title='登录' hideNavBar={true}/>
        <Scene key='join' component={JoinPage} title='注册'/>
        <Scene key='home' component={HomePage} title='主页'/>
      </Router>
    );
  }
}

export default App;
