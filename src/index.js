'use strict';

var React = require('react-native');
var tweenState = require('react-tween-state');

var {
  Image,
  StyleSheet,
  TouchableHighlight,
  View
} = React;

var styles = require('./styles');
var images = require('./images');

var SPIN_DURATION = 1000;

var ProgressHUDMixin = {
  getInitialState: function() {
    return {
      is_hud_visible: false
    };
  },

  showProgressHUD: function() {
    this.setState({
      is_hud_visible: true
    });
  },

  dismissProgressHUD: function() {
    this.setState({
      is_hud_visible: false
    });
  },

  childContextTypes: {
    showProgressHUD: React.PropTypes.func,
    dismissProgressHUD: React.PropTypes.func
  },

  getChildContext: function() {
    return {
      showProgressHUD: this.showProgressHUD,
      dismissProgressHUD: this.dismissProgressHUD
    };
  },
};

var ProgressHUD = React.createClass({
  mixins: [tweenState.Mixin],

  contextTypes: {
    showProgressHUD: React.PropTypes.func.isRequired,
    dismissProgressHUD: React.PropTypes.func
  },

  statics: {
    Mixin: ProgressHUDMixin
  },

  getInitialState: function() {
    return {
      rotate_deg: 0
    };
  },

  componentDidMount: function() {
    // Kick off rotation animation
    this.rotateSpinner();

    // Set rotation interval
    this.interval - setInterval(() => {
      this.rotateSpinner();
    }, SPIN_DURATION);
  },

  componentWillUnmount: function() {
    clearInterval(this.interval);
  },

  rotateSpinner: function() {
    this.tweenState('rotate_deg', {
      easing: tweenState.easingTypes.linear,
      duration: SPIN_DURATION,
      endValue: this.state.rotate_deg === 0 ? 360 : this.state.rotate_deg + 360
    });
  },

  tick: function() {
    this.rotateSpinner();
  },

  clickHandler: function() {
    if (this.props.isDismissible) {
      this.context.dismissProgressHUD();
    }
  },

  render: function() {
    // Return early if not visible
    if (!this.props.isVisible) {
      return <View />;
    }

    // Background color overrides
    var bg = 'rgba(0, 0, 0, 0)';
    if (this.props.backgroundType === 'light') {
      bg = 'rgba(255, 255, 255, 0.25)';
    } else if (this.props.backgroundType === 'dark') {
      bg = 'rgba(0, 0, 0, 0.11)';
    }

    // Set rotation property value
    var deg = Math.floor(
      this.getTweeningValue('rotate_deg')
    ).toString() + 'deg';

    return (
      /*jshint ignore:start */
      <TouchableHighlight
        key="ProgressHUD"
        style={[styles.overlay, {
          backgroundColor: bg
        }]}
        onPress={this.clickHandler}
        underlayColor={bg}
        activeOpacity={1}
      >
        <View
          style={[styles.container, {
            left: this.getTweeningValue('left')
          }]}
        >
          <Image
            style={[styles.spinner, {
              transform: [
                {rotate: deg}
              ]
            }]}
            source={{
              uri: 'data:image/jpeg;base64,' + images['1x'],
              isStatic: true
            }}
          >
            <View style={styles.inner_spinner}>
            </View>
          </Image>
        </View>
      </TouchableHighlight>
      /*jshint ignore:end */
    );
  }
});


module.exports = ProgressHUD;
