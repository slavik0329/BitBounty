'use strict';

var React = require('react-native');
var LoadingBlock = require("./loadingBlock")

var {
  Dimensions,
  ListView,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} = React;

module.exports = React.createClass({
  propTypes: {
    onRefresh: React.PropTypes.func,
    isRefreshing: React.PropTypes.bool,
    extraHeader: React.PropTypes.element,
    firstLoaded: React.PropTypes.bool // Did data load yet?
  },
  getInitialState() {
    return {
    };
  },
  refreshControl () {
    return <RefreshControl
              refreshing={this.props.isRefreshing}
              onRefresh={this.props.onRefresh}
              tintColor="#5EADD0"
              title="Loading..."
              progressBackgroundColor="#FFF"
            />
  },
  renderHeader(){
    if ( this.props.extraHeader ) {
      return this.props.extraHeader
    }
  },
  render: function() { 
    var rowCount = this.props.dataSource.getRowCount();

    var loadingVisible = ( rowCount < 1 && !this.props.firstLoaded );

    return (
      <View style={styles.container}>
        
      

        <ListView 
          {...this.props}
          style={styles.scroll}
          refreshControl={this.refreshControl()}
          onScroll={this.handleScroll}
          renderHeader={this.renderHeader}
          automaticallyAdjustContentInsets={false}/>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#FFF",
  },
  scroll: {
    backgroundColor: "#FFF",
  }
});
