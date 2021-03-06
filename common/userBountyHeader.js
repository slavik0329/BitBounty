'use strict';

var React = require('react-native');
var TimeAgo = require('../shared/timeAgo.js');
const { Icon, } = require('react-native-icons');
var API = require('../api.js');

var {
  Image,
  StyleSheet,
  Text,
  View,
} = React;

module.exports = React.createClass({
  getInitialState () {
    return {
      userImage: null,
      username:null
    }
  },
  componentDidMount () {
    API.getUser(this.props.userId, (res)=> {
      if ( res.user.image ) {

        this.setState({
          userImage: res.user.image,
          username: res.user.username
        })
      } else{

        this.setState({
          userImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAB/CAMAAADxY+0hAAAAJ1BMVEX////Z2dnW1tb6+vrz8/Pp6enj4+Pv7+/f39/29vbc3Nzs7Ozm5uaaVhUjAAACxElEQVRoge2a23aEMAhFJ3dv//+9zVhtraMJMAez2nqW75sQAiT4eNy6devWL5PzPo1hmkIYve8vZqc4GGNt/mYZY4bg3UXwsTNP4l52iBe4wUV7BF9NSMr46Ry+WOAV6X4o02dNavhUWfzigk4pEEcSPmtQMSBQ8VkKBpBXP3sAjnccvLERze84+GwA+BjSQn8rLJ9LN3ZE4vnLx4Ygc/dnBwAjoOfjjQEeAdbZXwXMggL3Z+G6AREedwKciI8rxKLwAwagl/G7v8IX7j/M/zK+DSh+6/P3oLS9r3xcAYgiB+DyH6f1/BIw/3sJH3b82tdfJwlA5D1MwLfIq7DgAFjkHSjw+cg7mJM0QED/d5Lzh8t/ouMPTACy9ItLwEI8LAJk7scVYOHyYRlIVP6zUAegdfyJrn8G9wTRuv8W9p+4BCy7f8Pw9Wfng9UD28+sxOVH9BNoZLlA4RWekYWgvdcqTg+k8QDO6AKArf+3GLdgnREIOQBUtj8nATJfZwDTUwNAZfsf5A1Qcj+9DCjhiXVQbfnERgA++tmI8hCiOgavtoJWeQZeuYmi514vqswB9YbPq8plUP8fiOJblFbm26hUBq2++4tJCPjkfKri+hvzLwj/cvxp5t5FxRpwQfyXi7A+v1wB9P+AKi4fO/U/UuVPAPyPJzs1rn/VS5DuCagPInQjgHAJ12yAaG8AagZQX2F0DHDkFxCVG4A//OnzxAB4HaQv/tMA5PQl0/kDWNvBMpELDNdvFCEWuElGx/jA8/b9xQIT3rgR9ELH75wgC0WXjn+zlmhiZyQfYXDz3IZuZOyDGwcgfDHBUo+DF01bKSaYuhNckg67aBaUf9F3Ae/4vc5zwhuZhqOzrMSfsQAtEFSYtywYfsZB0t/3vTYDImZxR2nNy+zZFkjLT/JtFv+pvi3+OadrSc+6+Tf/5t/8/8r/ABcwIoa2idwgAAAAAElFTkSuQmCC",
        })
      }
      
    })
  },
  getBountyAmount() {
    if ( this.props.bountyAmount ) {
      return <View style={styles.bountyAmount}>
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
    }
  },
  getStatus() {
    if ( this.props.inProgress ) {
      return <Text style={styles.progressText}>In Progress</Text>
    }
  },
  render: function() {
  
    return (
      <View style={[styles.top, this.props.style]}>
        <View style={styles.userInfo}>
          <Image
             source={{uri: this.state.userImage}}
             style={styles.userImage} />
          <Text style={styles.usernameText}>{this.state.username}</Text>
        </View>
        {this.getStatus()}
        {this.getBountyAmount()}
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
 progressText: {
  color: "green",
  position: "absolute",
  top: 12,
  left: 140,
 }
});
