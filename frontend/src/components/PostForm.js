import React from 'react';
import PropTypes from 'prop-types';


const PostForm = (props) => {


  return <form onSubmit={props.handleSubmit}>
    {props.children}
    <textarea
      name="text"
      autoFocus="true"
      rows={props.rows}
      className="messageInput"
      value={props.inputText}
      onChange={props.handleInputChange}
    />
    <input type="submit" disabled={props.disabled} value="Submit" />
  </form>;
};
PostForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  inputText: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  children: PropTypes.string,
  rows: PropTypes.number,
  disabled: PropTypes.bool,
};


const mapStateToProps = (state, ownProps) => {
  var id = ownProps.parentId || "_allForm";
  var disabled = state.status.loading.postForms[id];
  var error = state.status.errors.postForms[id];
  return {
    disabled,
    error
  };
};

export default PostForm;
