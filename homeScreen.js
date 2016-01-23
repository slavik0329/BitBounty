'use strict';

var React = require('react-native');
var TopSpacer = require('./shared/topSpacer.js');
var TitleBar = require('./shared/titleBar.js');
var BountyItem = require('./common/bountyItem.js');
var ScrollWithRefresh = require('./shared/scrollWithRefresh.js');

import {connect} from 'react-redux/native'
import {login, logout, menuChange} from './app/actions/main'

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
    }
  },  
  componentDidMount () {
    this.refresh();
  },
  renderBounty(bounty)  {
    return <BountyItem 
            navigator={this.props.navigator}
            key={bounty._id} 
            data={bounty}/>
  },
  refresh () {
    var bounties = [
      {
        username: "JasonKing",
        userImage: "https://scontent-ord1-1.xx.fbcdn.net/hprofile-xfa1/v/t1.0-1/p320x320/11903719_991959437513464_2888597908116804130_n.jpg?oh=d266cfcc7b13d6c5a8f91ca07aa906af&oe=573AA7A0",
        bountyAmount: 0.15,
        title: "Feed the homeless in Wynwood",
        description: "Help feed some hungry people in Wynwood. You must submit proof in order to recieve payment.",
        location: {
          latitude: 26.801336,
          longitude: -80.199341,
        }
      },
      {
        username: "Slavik",
        userImage: "https://scontent-ord1-1.xx.fbcdn.net/hprofile-xfa1/v/t1.0-1/p320x320/10363871_10100210846434665_1289736873989860790_n.jpg?oh=134a965740ba90b1ea073d8d8f6c416f&oe=574092CD",
        bountyAmount: 0.1511,
        title: "Take out my trash",
        description: "I'm looking for a high speed individual to get to my house as soon as possible and take my trash to the curb. Thanks."
      }
    ];

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(bounties)
    })
  },
  render: function() {
  
    return (
      <View style={[styles.container]}>
        <TopSpacer />
        <TitleBar 
          title={"Bounti"}/>

        <ScrollWithRefresh 
          dataSource={this.state.dataSource}
          renderRow={this.renderBounty}
          firstLoaded={this.state.firstLoaded}
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
