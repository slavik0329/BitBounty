'use strict';

var React = require('react-native');
var TimeAgo = require('../shared/timeAgo.js');
const { Icon, } = require('react-native-icons');

var {
  Image,
  StyleSheet,
  Text,
  View,
} = React;

module.exports = React.createClass({
  
  render: function() {
  
    return (
      <View style={[styles.top, this.props.style]}>
        <View style={styles.userInfo}>
          <Image
             source={{uri: this.props.userImage}}
             style={styles.userImage} />
          <Text style={styles.usernameText}>{this.props.username}</Text>
        </View>
        <View style={styles.bountyAmount}>
          <Icon
            name={"fontawesome|bitcoin"}
            size={20}
            color='#E26648'
            style={[{
              width: 20,
              height: 20,
              marginRight: 4,
              top: 2
            }]}
          />
          <Text style={styles.bountyAmountText}>{this.props.bountyAmount}</Text>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  userImage: {
      width:40,
      height: 40,
      borderRadius: 4,
      justifyContent:"center"
  },
  userInfo: {
    flexDirection:"row"
  },
  usernameText: {
    color: "#1b7eaa",
    fontWeight: "600",
    fontSize: 14,
    left: 8,
    top:12
  },
  time: {
      position: "absolute",
      right: 8,
      top: 12,
      flexDirection:"row",
  },
  timeText: {
      color: "#666",
      fontSize: 14
  },
  timeIcon: {
      marginTop:2,
      marginRight:4,
  },
  bountyAmount: {
    position: "absolute",
    right:-6,
    top:4,
    flexDirection:"row"
  },
  bountyAmountText: {
    fontSize: 20,
    color: "#E26648",
    left:-4,
  },
 
});
