'use strict';

var React = require('react-native');
var POIPin = require('./poiPin.js');

var {
  Image,
  Dimensions,
  MapView,
  StyleSheet,
  View,
} = React;

var timer;

module.exports = React.createClass({
  getInitialState(){
    return {
      pinReady: false
    }
  },
  componentWillUnmount(){
    clearTimeout(timer);
  },
  getDefaultProps() {
    return {
      showsUserLocation: true
    }
  },
  componentDidMount(){
    timer = setTimeout(()=>{
      this.setState({
        pinReady:true
      })
    }, 2000)
  },
  render () {
    var screenSize = Dimensions.get('window');
    
    const mapHeight = screenSize.height - 300;
    const centerPinSize = 35;

    if ( this.state.pinReady ) {
      var pin = <View
              style={{
                position: "absolute",
                left:(screenSize.width/2)-(centerPinSize/2)+1,
                top:((mapHeight/2)-(centerPinSize/2))-16,
                backgroundColor: "rgba(0,0,0,0)"
              }}>
                <POIPin />
            </View>
    }

    return <View style={styles.mapContainer}>
        <MapView 
          {...this.props}
          style={{
            height: mapHeight
          }}
          showsUserLocation={this.props.showsUserLocation}
          showsCompass={true}
          legalLabelInsets={{
              bottom: 6, 
              right: 6,
          }}/>
          {pin}
      </View>
  }
});

var styles = StyleSheet.create({
  
});
