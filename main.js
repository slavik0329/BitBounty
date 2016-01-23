'use strict';

var React = require('react-native');
var StartScreen = require('./startScreen.js');
var Menu = require('./menu.js');
var SideMenu = require('react-native-side-menu');

import {connect} from 'react-redux/native'
import {menuChange} from './app/actions/main'

var {
    Dimensions,
    NavigatorIOS,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} = React;

var Main = React.createClass({
    componentDidMount() {
    },
    menuChanged: function (isOpen) {
      this.props.dispatch(menuChange(isOpen));
    },
    render: function () {
        return (
            <View style={styles.container}>
                <SideMenu 
                  menu={<Menu 
                    navigator={this.refs.navigator}/>}
                  menuPosition={"left"}
                  isOpen={this.props.main.menuVisible}
                  onChange={this.menuChanged}
                  disableGestures={true}>
                  <View style={styles.container}>
                    <NavigatorIOS
                      ref="navigator"
                      style={styles.container}
                      initialRoute={{
                        component: StartScreen,
                        title: "Home"
                      }}
                      navigationBarHidden={true}
                    />
                  </View>      
                </SideMenu>
            </View>
        );
    }
});

function mapStateToProps(state) {
  return {
    main: state.main
  }
}

module.exports = connect(mapStateToProps)(Main)

var styles = StyleSheet.create({
    container: {
        flex:1
    },

});
