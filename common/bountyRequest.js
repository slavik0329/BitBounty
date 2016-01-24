'use strict';

var React = require('react-native');
var BlurModal = require('../shared/blurModal.js');
var ShowBountyScreen = require('../showBountyScreen.js');
var UserBountyHeader = require('./userBountyHeader.js');
const { Icon, } = require('react-native-icons');

var {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} = React;

module.exports = React.createClass({
  getInitialState() {
    return {
      modalVisible: false
    }
  },
  getDefaultProps() {
    return {
      image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAB/CAMAAADxY+0hAAAAJ1BMVEX////Z2dnW1tb6+vrz8/Pp6enj4+Pv7+/f39/29vbc3Nzs7Ozm5uaaVhUjAAACxElEQVRoge2a23aEMAhFJ3dv//+9zVhtraMJMAez2nqW75sQAiT4eNy6devWL5PzPo1hmkIYve8vZqc4GGNt/mYZY4bg3UXwsTNP4l52iBe4wUV7BF9NSMr46Ry+WOAV6X4o02dNavhUWfzigk4pEEcSPmtQMSBQ8VkKBpBXP3sAjnccvLERze84+GwA+BjSQn8rLJ9LN3ZE4vnLx4Ygc/dnBwAjoOfjjQEeAdbZXwXMggL3Z+G6AREedwKciI8rxKLwAwagl/G7v8IX7j/M/zK+DSh+6/P3oLS9r3xcAYgiB+DyH6f1/BIw/3sJH3b82tdfJwlA5D1MwLfIq7DgAFjkHSjw+cg7mJM0QED/d5Lzh8t/ouMPTACy9ItLwEI8LAJk7scVYOHyYRlIVP6zUAegdfyJrn8G9wTRuv8W9p+4BCy7f8Pw9Wfng9UD28+sxOVH9BNoZLlA4RWekYWgvdcqTg+k8QDO6AKArf+3GLdgnREIOQBUtj8nATJfZwDTUwNAZfsf5A1Qcj+9DCjhiXVQbfnERgA++tmI8hCiOgavtoJWeQZeuYmi514vqswB9YbPq8plUP8fiOJblFbm26hUBq2++4tJCPjkfKri+hvzLwj/cvxp5t5FxRpwQfyXi7A+v1wB9P+AKi4fO/U/UuVPAPyPJzs1rn/VS5DuCagPInQjgHAJ12yAaG8AagZQX2F0DHDkFxCVG4A//OnzxAB4HaQv/tMA5PQl0/kDWNvBMpELDNdvFCEWuElGx/jA8/b9xQIT3rgR9ELH75wgC0WXjn+zlmhiZyQfYXDz3IZuZOyDGwcgfDHBUo+DF01bKSaYuhNckg67aBaUf9F3Ae/4vc5zwhuZhqOzrMSfsQAtEFSYtywYfsZB0t/3vTYDImZxR2nNy+zZFkjLT/JtFv+pvi3+OadrSc+6+Tf/5t/8/8r/ABcwIoa2idwgAAAAAElFTkSuQmCC"
    }
  },

  handlePress() {
    this.props.navigator.push({
      component: ShowBountyScreen,
      passProps: {
        data: this.props.data
      }
    })
  },
  handleAccept () {
    this.setState({
      modalVisible: true
    })
  },
  render: function() {
  
    return (
      <View 
        style={[styles.container]}>
        <BlurModal 
          visible={this.state.modalVisible}>
          <View
            style={styles.modalInner}>
            <Text 
              style={styles.modalText}>Send {this.props.data.amount} to 3J26aNwBeUtvDzCiLLy9MMWL1AnQQHonUs</Text>

            <Image 
              style={{
                width: 300,
                height: 300,
                alignSelf: "center",
                marginTop: 20
              }}/>
          </View>
        </BlurModal>
        <UserBountyHeader 
          userId={this.props.data.userId}/>

        <TouchableOpacity
          onPress={this.handleAccept}
          style={styles.button}>
          <Text 
            style={styles.buttonText}>
            Accept
          </Text>
        </TouchableOpacity>       

      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 8,
    borderColor: "#eee",
    borderBottomWidth:1
  },
  bottom: {
    marginTop:4
  },
  title:{
    fontSize: 16,
    color: "#555",
    fontWeight: "500",
  },
  button: {
    padding: 8,
    backgroundColor: "5EADD0",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    borderRadius:4,
    marginTop: 6,
    position: "absolute",
    top: 6,
    right: 8
  },
  buttonText: {
    color: "#FFF",
  },
  modalInner: {
    backgroundColor: "#0079c0",
    marginTop: 80,
    padding: 15,
    marginRight:15,
    marginLeft:15,
    borderRadius: 4
  }
  
});
