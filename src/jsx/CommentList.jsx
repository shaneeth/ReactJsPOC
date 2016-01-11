var CSSTransitionGroup = React.addons.CSSTransitionGroup;
var CommentList = React.createClass({
  render: function() {
    var commentsList = this.props.data;
    if(commentsList.length==0) {
      return (
        <h1>Loading...</h1>
      );
    } else {
      var commentNodes = commentsList.map(function(comment, index) {
        var props = {
          removeComment: this.props.removeComment,
          index: index,
          author: comment.author,
          id: comment.id,
          key: comment.id
        };
        var element = (
          <Comment {...props}>
            {comment.text}
          </Comment>
        );
        return element;
      }.bind(this));
      return (
        <div className="comment-list">
          <CSSTransitionGroup component="div" transitionName="comment-an" transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
            {commentNodes}
          </CSSTransitionGroup>
        </div>
      );
    }
  }
});
console.log(React);
