jest.dontMock('../index');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var ProgressHUD = require('../index');

describe('ProgressHUD', function() {
  it('should be a ReactElement', function() {
    var is_element = TestUtils.isElement(
      /*jshint ignore:start */
      <ProgressHUD isVisible={false}/>
      /*jshint ignore:end */
    );

    expect(is_element).toBe(true);
  });

  it('should not be dismissible by default', function() {
    expect(ProgressHUD.defaultProps.isDismissible).toBe(false);
  });

  it('should default to a black spinner', function() {
    expect(ProgressHUD.defaultProps.color).toBe('#000');
  });

  it('should default to a transparent overlay', function() {
    expect(ProgressHUD.defaultProps.overlayColor).toBe('rgba(0, 0, 0, 0)');
  });
});

describe('Mixin', function() {
  it('should expose a Mixin', function() {
    expect(ProgressHUD.Mixin).toBeTruthy();
  });

  it('should expose a showProgressHUD method', function() {
    expect(ProgressHUD.Mixin.showProgressHUD).toBeTruthy();
  });

  it('should expose a dismissProgressHUD method', function() {
    expect(ProgressHUD.Mixin.dismissProgressHUD).toBeTruthy();
  });
});

