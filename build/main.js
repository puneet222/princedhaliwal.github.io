ReactDOM.render(React.createElement(
  'h1',
  null,
  'Hello, world!'
), document.getElementById('example'));

var CommentBox = React.createClass({
  displayName: 'CommentBox',

  render: function () {
    return React.createElement(
      'div',
      { className: 'commentBox' },
      'Hello, world! I am a CommentBox.'
    );
  }
});
ReactDOM.render(React.createElement(CommentBox, null), document.getElementById('content'));