'use strict';

var React = require('react-native');
const { Icon, } = require('react-native-icons');

var {
  StyleSheet,
  Text,
  TouchableOpacity,
} = React;

module.exports = React.createClass({
  getInitialState() {
      return {
        
      };
  },
  componentDidMount () {
   
  },
  render: function() {

    return (
      <TouchableOpacity 
        style={[styles.container, this.props.style]}
        onPress={this.props.onPress}>
        <Text style={styles.title}>{this.props.title}</Text>
        <Icon
          name={"fontawesome|chevron-right"}
          size={20}
          color='#444'
          style={[{
            position:"absolute",
            width: 20,
            height: 20,
            right: 6,
            top: 13
          }]}
        />
      </TouchableOpacity>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginTop: 4,
  },
  title: {
    fontSize: 20,
    color: "#666"
  }
});
