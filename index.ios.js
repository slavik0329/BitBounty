'use strict';

var React = require('react-native');
var Main = require('./main.js');

import { Provider } from 'react-redux/native'
import configureStore from './app/store/configure-store'

const store = configureStore()

var {
  AppRegistry,
  StyleSheet,
  StatusBarIOS,
  View,
} = React;

var reactSkeleton = React.createClass({
  componentDidMount() {
      StatusBarIOS.setStyle("light-content");  
  },

  render: function() {

    return (
      <Provider store={store}>
        {() => <Main/>}
      </Provider>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});

AppRegistry.registerComponent('reactSkeleton', () => reactSkeleton);