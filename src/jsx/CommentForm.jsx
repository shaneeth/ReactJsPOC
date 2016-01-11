var CommentForm = React.createClass({
  getInitialState: function() {
    return {
      author: '',
      text: ''
    }
  },
  handleAuthorChange: function(e) {
    this.setState({
      author: e.target.value
    });
  },
  handleTextChange: function(e) {
    this.setState({
      text: e.target.value
    });
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    this.props.onCommentSubmit({
      author: author,
      text: text
    });
    this.setState({
      author: '',
      text: ''
    });
  },
  render: function() {
    return (
      <div className = "comment-form">
        <form onSubmit={this.handleSubmit}>
        <input type="text"
               placeholder="Name"
               value={this.state.author}
               onChange={this.handleAuthorChange} />
        <input type="text"
               placeholder="Type Something..."
               value={this.state.text}
               onChange={this.handleTextChange} />
        <input type="submit" value="Comment"/>
        </form>
      </div>
    );
  }
});
