'use strict';

var React = require('react-native');
var BlurModal = require('./blurModal.js')
var API = require('../api.js')

var {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} = React;

module.exports = React.createClass({
  getInitialState() {
      return {
        modalVisible: false,
        username:""
      };
  },
  componentDidMount() {
      if ( !this.props.account.username ) {
        this.setState({
          modalVisible: true,
        })
      }
  },
  handleSubmit() {
    API.setUsername(this.state.username, (res)=> {
      console.log(res)
      if ( res.ok ) {
        this.setState({
          modalVisible: false
        }, ()=> {
          this.props.onUsernameSet( this.state.username )
        })
      }
    })

    
  },
  render: function() {
    return (
      <View>
        <BlurModal 
          visible={this.state.modalVisible}>
          <View style={styles.container}>

            <Text style={styles.text}>
              Pick a Username
            </Text>

            <TextInput 
              ref="textbox"
              onChangeText={(username)=>this.setState({username})} 
              autoFocus={true}
              style={styles.input}/>

            <TouchableOpacity
              onPress={this.handleSubmit}
              style={styles.button}>
              <Text
                style={styles.buttonText}>
                Next
              </Text>
            </TouchableOpacity>

          </View>
        </BlurModal>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    backgroundColor: "#0079c0",
    marginTop: 80,
    padding: 15,
    marginRight:15,
    marginLeft:15,
    borderRadius: 4
  },
  text: {
    textAlign:"center",
    color: "#FFF",
    fontSize: 24,
  
  },
  box: {
    backgroundColor: "#FFF",
    marginTop:20,
    borderRadius: 2,

    padding: 6
  },
  input: {
    height: 40,
    backgroundColor: "#FFF",
    marginTop:12,
    borderRadius: 4,
    paddingLeft: 5,
    paddingRight: 5,
  },
  button:{
    backgroundColor:"#5EADD0",
    marginTop: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 20,
    color: "#FFF",
    padding: 10,

  }

});
