import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostListContainer from '../containers/PostListContainer';


class UserPage extends Component {



  render() {

    return <div>
      User Page

      <PostListContainer match={this.props.match} />
    </div>;
  }
}

export default UserPage;

UserPage.propTypes = {

};
