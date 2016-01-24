'use strict';

var React = require('react-native');
var TopSpacer = require('./shared/topSpacer.js');
var TitleBar = require('./shared/titleBar.js');
var BountyItem = require('./common/bountyItem.js');
var ScrollWithRefresh = require('./shared/scrollWithRefresh.js');
var AddBountyScreen = require('./addBountyScreen.js');
var UsernameNag = require('./shared/usernameNag.js');
var API = require('./api.js');

import {connect} from 'react-redux/native'
import {login, logout, menuChange, setUsername} from './app/actions/main'

var {
  Dimensions,
  ListView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} = React;

var HomeScreen = React.createClass({
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
    }
  },  
  componentDidMount () {
    this.refresh();
  },
  renderBounty(bounty)  {
    return <BountyItem 
            userImages={this.state.userImages}
            navigator={this.props.navigator}
            key={bounty._id} 
            data={bounty}/>
  },
  refresh () {
    this.setState({
      isRefreshing: true
    })

    API.getBounties(null, (res) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(res.bounties),
        isRefreshing: false,
        firstLoaded: true,
        userImages: this.state.userImages.concat(res.userImages),
      })
    });

    

    
  },
  handleUsernameSet(username) {
    this.props.dispatch( setUsername(username) )
  },
  handleAddBounty() {
    this.props.navigator.push({
      component: AddBountyScreen
    })
  },
  render: function() {
  
    return (
      <View style={[styles.container]}>
        <UsernameNag 
          onUsernameSet={this.handleUsernameSet}
          account={this.props.main.account}/>
        <TopSpacer />
        <TitleBar 
          title={"Bounti"}
          onAddPress={this.handleAddBounty}/>

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

module.exports = connect(mapStateToProps)(HomeScreen)

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",

  },
  
});
