# React Native Progress HUD
[![npm](https://img.shields.io/npm/v/react-native-progress-hud.svg?style=flat-square)](https://www.npmjs.com/package/react-native-progress-hud)
[![npm downloads](https://img.shields.io/npm/dm/react-native-progress-hud.svg?style=flat-square)](https://www.npmjs.com/package/react-native-progress-hud)
[![Travis](https://img.shields.io/travis/naoufal/react-native-progress-hud/master.svg?style=flat-square)](https://travis-ci.org/naoufal/react-native-progress-hu://travis-ci.org/naoufal/react-native-progress-hud)
[![Code Climate](https://img.shields.io/codeclimate/github/naoufal/react-native-progress-hud.svg?style=flat-square)](https://codeclimate.com/github/naoufal/react-native-progress-hud)

React Native Progress HUD is a [React Native](https://facebook.github.io/react-native/) port of the popular [`SVProgressHUD`](https://github.com/TransitApp/SVProgressHUD).  It is a clean and easy-to-use HUD meant to display the progress of an ongoing task.

Are you using [React](https://facebook.github.io/react/)?  Check out [React Progress HUD](https://github.com/naoufal/react-progress-hud).

![progress-hud-screen](https://cloud.githubusercontent.com/assets/1627824/7716549/94f15754-fe61-11e4-9a59-358d460197f2.gif)

## Install
```shell
npm i --save react-native-progress-hud
```

## Usage
Using the HUD in your app will usually look like this:
```js
var ProgressHUD = require('react-native-progress-hud');

var YourComponent = React.createClass({
  mixins: [ProgressHUD.Mixin],

  ...

  render() {
    return (
      <View>
        ...
        <ProgressHUD
          isVisible={this.state.is_hud_visible}
          isDismissible={true}
          overlayColor="rgba(0, 0, 0, 0.11)"
        />
      </View>
    );
  }
```

### Showing the HUD
You can display the HUD by calling:
```js
  this.showProgressHUD();
```

### Dismissing the HUD
It can be dismissed by calling:
```js
  this.dismissProgressHUD();
```

### Child Components
From time to time, you may need to show the HUD from the a child component.  Using the HUD from a child component will look like this:

```js
var YourChildComponent = React.createClass({
  render() {
    contextTypes: {
      showProgressHUD: React.PropTypes.func,
      dismissProgressHUD: React.PropTypes.func
    },

    return (
      <View>
        ...
        <TouchableHighlight
          onPress={this.context.showProgressHUD}
        >
          Show Progress HUD
        </TouchableHighlight>
      </View>
    );
  }
```

## Props
The following props can be used to modify the HUD's style and/or behaviour:

| Prop | Type | Opt/Required | Default | Note |
|---|---|---|---|---|
|__`isVisible`__|_Boolean_|Required|`N/A`|Displays the HUD when set to true.
|__`isDismissible`__|_Boolean_|Optional|`false`|When set to true, the HUD is dismissed on user interaction.
|__`overlayColor`__|_String_|Optional|`rgba(0, 0, 0, 0)`|Sets the color of the overlay.
|__`color`__|_String_|Optional|`#000`|Sets the color of the spinner.

## License
Copyright (c) 2015, [Naoufal Kadhom](http://naoufal.com)

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
