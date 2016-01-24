'use strict';

var React = require('react-native');

var {
  Image,
  Dimensions,
  MapView,
  StyleSheet,
  View,
} = React;

var timer;

module.exports = React.createClass({
  getDefaultProps() {
      return {
          type: "default",
          size: 35  
      };
  },
  getInner() {
    switch ( this.props.type ) {
      case "default":
        return <View style={styles.dot}></View>
        break;
    }
  },
  render () {
    return <View>
            <Image 
                source={{
                    uri: "map_poi.png"
                }}
                resizeMode={"contain"}
                style={[ {
                width: this.props.size,
                height: this.props.size,
              }]}>
              <View style={{
                position: "absolute",
                width: this.props.size,
                alignItems:"center",
                left: -.5,
                top: 6
              }}>
                {this.getInner()}
              </View>
            </Image>
      </View>
  }
});

var styles = StyleSheet.create({
  dot: {
    backgroundColor: "#FFF",
    width:15,
    height:15 ,
    borderRadius: 7.5
  }
});
