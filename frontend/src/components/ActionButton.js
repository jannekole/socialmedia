import React from 'react';
import PropTypes from 'prop-types';

const ActionButton = (props) => {
  var buttonClass = props.isActive ? "notLink activated" : "notLink";
  var buttonText = props.isActive ? props.children || props.activeText : props.children || props.inactiveText;
  return (
    <a href="" onClick={props.action} className={buttonClass}> {buttonText} </a>
  );
};

ActionButton.propTypes = {
  isActive: PropTypes.bool.isRequired,
  action: PropTypes.func.isRequired,
  children: PropTypes.string,
  activeText: PropTypes.string,
  inactiveText: PropTypes.string,
};

export default ActionButton;
