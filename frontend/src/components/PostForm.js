import React , {Component} from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { changePostInput, postReply } from '../actions/actions';


class PostForm extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    this.props.handleSubmit(this.props.inputText);
    e.preventDefault();
  }
  handleInputChange(e) {
    this.props.handleInputChange(e.target.value);
  }
  render() {
    return <form onSubmit={this.handleSubmit}>
      {this.props.children}
      <textarea
        name="text"
        autoFocus={this.props.autoFocus}
        rows={this.props.rows}
        className="messageInput"
        value={this.props.inputText}
        onChange={this.handleInputChange}
      />
      <input type="submit" disabled={this.props.disabled} value="Submit" />
    </form>;
  }
}
PostForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  inputText: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  children: PropTypes.string,
  rows: PropTypes.number,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
};

var all = undefined;
const mapStateToProps = (state, ownProps) => {
  var id = ownProps.parentId || all;
  var disabled = state.loading.postReplies[id];
  var inputText = state.input.forms[id] || "";
  // var error = state.status.errors.postForms[id];
  return {
    disabled,
    // error
    inputText,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  let parentId = ownProps.parentId || all;
  return {
    handleSubmit: (text) => dispatch(postReply(null, text, parentId)),

    handleInputChange: (text) => dispatch(changePostInput(text, parentId)),
  };
};

const PostFormContainer = connect(mapStateToProps, mapDispatchToProps)(PostForm);

export default PostFormContainer;
