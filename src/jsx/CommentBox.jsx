var numberOfKeys = 2;
var CommentBox = React.createClass({
  getInitialState: function() {
    return {
      data: []
    }
  },
  componentDidMount: function() {
    var listData = [
      {
        id: 1,
        author: "FirstName",
        text: "This is first comment"
      },
      {
        id: 2,
        author: "SecondName",
        text: "This is second comment"
      }
    ];
    setTimeout(function() {
      this.setState({data: listData});
    }.bind(this), 2000);
  },
  handleComment: function(comment) {
    comment.id = ++numberOfKeys;
    var list = this.state.data;
    list.push(comment);
    this.setState({data: list});
  },
  removeComment: function(index) {
    var list = this.state.data;
    list.splice(index, 1);
    this.setState({data: list});
  },
  render: function() {
    var props = {
      data: this.state.data,
      removeComment: this.removeComment
    };
    return (
      <div className="comment-box">
        <h1>Comments</h1>
        <CommentList {...props} />
        <CommentForm onCommentSubmit={this.handleComment} />
      </div>
    );
  }
});
