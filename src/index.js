'use strict';

var React = require('react-native');

var {
  Image,
  StyleSheet,
  TouchableHighlight,
  View,
  Animated,
  Easing,
} = React;

var styles = require('./styles');
var images = require('./images');

var SPIN_DURATION = 1000;

var ProgressHUDMixin = {
  getInitialState() {
    return {
      is_hud_visible: false
    };
  },

  showProgressHUD() {
    this.setState({
      is_hud_visible: true
    });
  },

  dismissProgressHUD() {
    this.setState({
      is_hud_visible: false
    });
  },

  childContextTypes: {
    showProgressHUD: React.PropTypes.func,
    dismissProgressHUD: React.PropTypes.func
  },

  getChildContext() {
    return {
      showProgressHUD: this.showProgressHUD,
      dismissProgressHUD: this.dismissProgressHUD
    };
  },
};

var ProgressHUD = React.createClass({

  contextTypes: {
    showProgressHUD: React.PropTypes.func.isRequired,
    dismissProgressHUD: React.PropTypes.func
  },

  statics: {
    Mixin: ProgressHUDMixin
  },

  propTypes: {
    isDismissible: React.PropTypes.bool,
    isVisible: React.PropTypes.bool.isRequired,
    color: React.PropTypes.string,
    overlayColor: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      isDismissible: false,
      color: '#000',
      overlayColor: 'rgba(0, 0, 0, 0)'
    };
  },

  getInitialState() {
    return {
      rotate_deg: new Animated.Value(0),
    };
  },

  componentDidUpdate: function(prevProps, prevState) {
    this.props.isVisible!=prevProps.isVisible&&this.props.isVisible&&this._rotateSpinner();
  },

  _rotateSpinner() {

    if(!this.props.isVisible)return;

    if(this.state.rotate_deg._value===1){
      this.state.rotate_deg.setValue(0);
    }
    
    Animated.timing(this.state.rotate_deg,{
      toValue:1,
      duration:SPIN_DURATION,
      easing: Easing.linear,
    }).start(this._rotateSpinner);
  },

  _clickHandler() {
    if (this.props.isDismissible) {
      this.context.dismissProgressHUD();
    }
  },

  render() {
    // Return early if not visible
    if (!this.props.isVisible) {
      return <View />;
    }

    return (
      /*jshint ignore:start */
      <TouchableHighlight
        key="ProgressHUD"
        style={[styles.overlay, {
          backgroundColor: this.props.overlayColor
        }]}
        onPress={this._clickHandler}
        underlayColor={this.props.overlayColor}
        activeOpacity={1}
      >
        <View
          style={styles.container}
        >
          <Animated.View
            style={[styles.spinner, {
                transform: [
                  {rotate: this.state.rotate_deg.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg']
                })}
                ]
              }]}>
            <Image//Animated.Image have issue in Android
              style={[styles.spinner, {
                backgroundColor: this.props.color,
              }]}
              source={{
                uri: 'data:image/png;base64,' + images['1x'],
                isStatic: true
              }}
            >
              <View style={styles.inner_spinner}>
              </View>
            </Image>
          </Animated.View>
        </View>
      </TouchableHighlight>
      /*jshint ignore:end */
    );
  }
});


module.exports = ProgressHUD;
