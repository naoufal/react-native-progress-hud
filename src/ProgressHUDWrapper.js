import { Component } from "react-native";
import ProgressHUD from "./index";

const INITIAL_STATE = {
  isVisible: false,
  isDismissible: false,
  overlayColor: null,
  color: null
};

const ProgressHUDWrapper = ComposedComponent => class extends Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
  }

  showProgressHUD(options) {
    let { isDismissible, overlayColor, color } = options;
    let newState = Object.assign({}, INITIAL_STATE, {
      isVisible: true,
      isDismissible,
      overlayColor,
      color
    });

    this.setState(newState);
  }

  dismissProgressHUD() {
    this.setState(INITIAL_STATE);
  }

  render() {
    return (
      <div>
        <ComposedComponent
          {...this.props}
          showProgressHUD={this.showProgressHUD.bind(this)}
          dismissProgressHUD={this.dismissProgressHUD.bind(this)}
          ProgressHUDisVisible={this.state.isVisible}
        />
        <ProgressHUD
          isVisible={this.state.isVisible}
          isDismissible={this.state.isDismissible}
          overlayColor={this.state.overlayColor}
          color={this.state.color}
        />
    </div>
    );
  }
};

export default ProgressHUDWrapper;
