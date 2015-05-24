'use strict';

var React = require('react-native');
var ProgressHUD = require('react-native-progress-hud');

var {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;


var HUD = React.createClass({
  mixins: [ProgressHUD.Mixin],

  clickHandler: function() {
    this.showProgressHUD();
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          react-native-progress-hud
        </Text>

        <Text style={styles.instructions}>
          github.com/naoufal/react-native-progress-hud
        </Text>

        <TouchableHighlight
          style={styles.btn}
          onPress={this.clickHandler}
          underlayColor="#0380BE"
          activeOpacity={1}
        >
        <Text style={{
          color: '#fff',
          fontWeight: '600'
        }}>
          Show Progress HUD
        </Text>
        </TouchableHighlight>
        <ProgressHUD
          isVisible={this.state.is_hud_visible}
          isDismissible={true}
          overlayColor="rgba(0, 0, 0, 0.11)"
        />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    margin: 10,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center'
  },
  instructions: {
    marginBottom: 5,
    color: '#333333',
    fontSize: 13,
    textAlign: 'center'
  },
  btn: {
    borderRadius: 3,
    marginTop: 200,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#0391D7',
  }
});

AppRegistry.registerComponent('HUDExample', () => HUDExample);
