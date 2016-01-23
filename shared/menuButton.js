'use strict';

var React = require('react-native');

var { Icon, } = require('react-native-icons');

import {connect} from 'react-redux/native'
import {menuToggle} from '../app/actions/main'

var {
    Dimensions,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} = React;

var MenuButton = React.createClass({

    handlePress () {
        this.props.dispatch(menuToggle())
    },
    getDefaultProps() {
        return {
            size: 35 
        };
    },
    render: function () {
       
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={this.handlePress} 
             {...this.props}
            >
            
            <Icon
              name='fontawesome|bars'
              size={this.props.size}
              color='#FFF'
              style={{
                width: this.props.size,
                height: this.props.size
              }}
            />

            </TouchableOpacity>
        );
    }
});

function mapStateToProps(state) {
  return {
    main: state.main
  }
}

module.exports = connect(mapStateToProps)(MenuButton)

var styles = StyleSheet.create({
    container: {

    },
   
});
