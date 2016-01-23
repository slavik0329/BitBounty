'use strict';

var React = require('react-native');

var {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = React;

const window = Dimensions.get('window');

module.exports = React.createClass({
  getInitialState() {
      return {
      };
  },
  render: function() {
    
    return (
      <View style={[styles.container, {
        width: Dimensions.get("window").width * (2/3)
      }]}>
        <TouchableOpacity 
          {...this.props}>
          <Text style={styles.text}>{this.props.title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    padding: 15,

    alignSelf: "flex-start"
  },
  text: {
    color: "#FFF",
    textAlign: "left",
    fontSize: 16
  }
});