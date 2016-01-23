'use strict';

var React = require('react-native');
var GoBack = require('./shared/goBack.js');
var TopSpacer = require('./shared/topSpacer.js');

var {
  Dimensions,
  MapView,
  ScrollView,
  StyleSheet,
  Text,
  View,
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
      <View style={[styles.container]}>
        <TopSpacer />
        <GoBack 
          onPress={()=>{
            this.props.navigator.pop();
          }}
          title={"View Location"}/>
        
        <MapView
          region={this.props.region}
          legalLabelInsets={{
              bottom: 6, 
              right: 6,
          }}
          annotations={[
            this.props.region
          ]}
          style={styles.map}/>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1
  }
});
