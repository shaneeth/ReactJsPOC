var Comment = React.createClass({
  onRemove: function() {
    this.props.removeComment(this.props.index);
  },
  render: function() {
    return (
      <div className = "comment">
        <h2 className = "comment-author">
          {this.props.author} - {this.props.id}
        </h2>
        <div className="remove-comment" onClick={this.onRemove}>X</div>
        {this.props.children}
      </div>
    );
  }
});
