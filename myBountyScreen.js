'use strict';

var React = require('react-native');
var GoBack = require('./shared/goBack.js');
var TopSpacer = require('./shared/topSpacer.js');
var API = require('./api.js');

import {connect} from 'react-redux/native'
// import {login, logout, menuChange} from './app/actions/main'

var {
  Dimensions,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

var StartScreen = React.createClass({
  getInitialState() {
      var ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
      });

      return {
        isRefreshing: false,
        bounties:[],
        dataSource: ds.cloneWithRows([]),
        firstLoaded: false,
        userImages:[]
      };
  },
  componentDidMount () {
    this.refresh();

    
  },
  refresh() {
    API.getMyBounties( (res) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(res.bounties),
        isRefreshing: false,
        firstLoaded: true,
        userImages: this.state.userImages.concat(res.userImages),
      })    
    } )
  },
  render: function() {
    return (
      <View style={[styles.container]}>
        <TopSpacer />
        <GoBack 
          onPress={()=>{
            this.props.navigator.pop();
          }}
          title="My Bounties"/>
        
      </View>
    );
  }
});

function mapStateToProps(state) {
  return {
    main: state.main
  }
}

module.exports = connect(mapStateToProps)(StartScreen)

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
 
});
