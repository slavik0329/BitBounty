'use strict';

var React = require('react-native');
var GoBack = require('./shared/goBack.js');
var TopSpacer = require('./shared/topSpacer.js');
var BountyItem = require('./common/bountyItem.js');

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

var MyBountScreen = React.createClass({
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
  renderBounty(bounty)  {
    return <BountyItem 
            userImages={this.state.userImages}
            navigator={this.props.navigator}
            key={bounty._id} 
            data={bounty}/>
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
        <ListView 
          dataSource={this.state.dataSource}
          renderRow={this.renderBounty}
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

module.exports = connect(mapStateToProps)(MyBountScreen)

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
 
});
