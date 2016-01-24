'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} = React;

module.exports = React.createClass({
  getInitialState() {
    return {
     
    };
  },
  setFalse(){
    this.props.onValueChange(false);
  },
  setTrue(){
    this.props.onValueChange(true);
  },
  render: function() {
    return (
      <View style={styles.container}>   
            <View style={styles.center}>     
              <View style={styles.inputs}>
                <TouchableOpacity
                  onPress={this.setFalse}>
                  <Text style={styles.inputText}>No</Text>
                </TouchableOpacity>
                <Switch 
                  {...this.props}/>
                <TouchableOpacity
                  onPress={this.setTrue}>
                 <Text style={styles.inputText}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
      </View>
    );
  }
});

function mapStateToProps(state) {
  return {
    pickupAvailable: state.pickupAvailable
  }
}

var styles = StyleSheet.create({
  container: {
  }, 
  inputs: {
    flexDirection:"row",
    alignItems:"center",
    height: 100,
    justifyContent:"center",
    transform: [{
      scale:1.4
    }]
  },
  inputText: {
    color:"#FFF",
    fontSize: 16,
    paddingRight: 8,
    paddingLeft: 8,
    fontWeight:"200"
  },
  center: {
    alignSelf:"center"
  }
});
