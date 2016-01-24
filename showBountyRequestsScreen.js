'use strict';

var React = require('react-native');
var GoBack = require('./shared/goBack.js');
var TopSpacer = require('./shared/topSpacer.js');
var WideButton = require('./shared/wideButton.js');
var BountyRequest = require('./common/bountyRequest.js');
var API = require('./api.js');


import {connect} from 'react-redux/native'
// import {login, logout, menuChange} from './app/actions/main'

var {
  AlertIOS,
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
         dataSource: ds.cloneWithRows([]),
         firstLoaded: false,
       };
   },
   componentDidMount () {
     this.refresh();


   },
   refresh() {
       this.setState({
         dataSource: this.state.dataSource.cloneWithRows(this.props.bounty.requests),
         isRefreshing: false,
         firstLoaded: true,
       })    
   },
   renderRequest(request)  {
     return <BountyRequest
             navigator={this.props.navigator}
             key={request.userId} 
             data={request}/>
   },

  render: function() {

    return (
      <View style={[styles.container]}>
        <TopSpacer />
        <GoBack 
          onPress={()=>{
            this.props.navigator.pop();
          }}
          title={"View Requests"}/>
        <ListView 
          dataSource={this.state.dataSource}
          renderRow={this.renderRequest}
          firstLoaded={this.state.firstLoaded}
          automaticallyAdjustContentInsets={false}
          isRefreshing={this.state.isRefreshing}
          onRefresh={this.refresh}/>

       
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
