'use strict';

var React = require('react-native');
const { BlurView, VibrancyView } = require('react-native-blur');

var {
  Dimensions,
  Modal,
  View,
} = React;

module.exports = React.createClass({
  getInitialState() {
      return {

      };
  },
  getDefaultProps() {
      return {
      };
  },
  render: function() {
    
    return (
        <Modal
          animated={true}
          transparent={true}
          visible={this.props.visible}>
          <BlurView blurType="light" >
            <View style={{
              height: Dimensions.get("window").height
            }}>
              {this.props.children}
            </View>
          </BlurView>
        </Modal>
    );
  }
});