import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadPosts, loadUsers, postPost, changeReplyInputVisibility } from '../actions/actions';

import Posts from '../components/Posts';
import UserPageTopInfo from '../components/UserPageTopInfo';

class UserPage extends Component {

  constructor(props) {
    super(props);

    this.state = {input: ""};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.loadUser();
    window.scrollTo(0, 0);
  }


  handleSubmit(e) {
    this.props.postPost(this.props.thisUser.userName, this.state.input);
    e.preventDefault();
  }

  handleInputChange(e) {
    this.setState({input: e.target.value});

  }

  render() {

    let userPage = null;
    let postForm = null;

    let isDisabled = false;
    let isLoading = false;
    let notification = null;

    //if this is a userpage, render UserPageTopInfo
    if (!this.props.all) {
      userPage = <UserPageTopInfo
        user={this.props.user}
        loadUser={this.props.loadUser}
      />;
    }

    //If this is the user's own page or front page, render reply box
    if (this.props.all || (this.props.user && this.props.user.userName === this.props.thisUser.userName)) {
      postForm = <div className="post">
        <form onSubmit={this.handleSubmit}>
          Post something
          <label>
            <textarea  name="text" rows="4" className="messageInput" onChange={this.handleInputChange} value={this.state.input} type="text" disabled={isDisabled} ></textarea>
          </label>
          <input type="submit" disabled={isDisabled} value="Send" />
          <div className="notification">{isLoading ? 'loading...' : null }{notification} </div>
        </form>
      </div>;

    }

    let userName = this.props.match.params.userName;
    let posts = this.props.posts;
    if (userName) {
      posts = posts.filter((post) => {
        return (post.user.userName === userName);
      });
    }


    return <div className="">

      {userPage}

      <div className="content">
        <div className="postList">

          {postForm}


          <Posts
            posts={posts}
            isFetching={this.props.contentIsFetching}
            loadPosts={this.props.loadPosts}
            changeReplyInputVisibility={this.props.changeReplyInputVisibility}
            routerKey={this.props.routerKey}
          />
        </div>
      </div>
    </div>;
  }
}


UserPage.propTypes = {
  posts: PropTypes.array.isRequired,
  contentIsFetching: PropTypes.bool.isRequired,
  loadPosts: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  postPost: PropTypes.func.isRequired,
  user: PropTypes.object,
  changeReplyInputVisibility: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  routerKey: PropTypes.string.isRequired,
  thisUser: PropTypes.object.isRequired,
  all: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => {


  let userFilter = ownProps.match.params.userName;
  let all = !userFilter;

  let posts = state.posts.items;
  let contentIsFetching = posts ? (state.posts.isFetching[userFilter] === true) : true;

  let user;
  if (!all) {
    user = state.users.byUserName[userFilter];
  }

  let thisUser = state.thisUser.user;

  let routerKey = ownProps.location.key;

  return {
    posts,
    contentIsFetching,
    user,
    all,
    thisUser,
    routerKey // updates component when linked from same page
  };
};



const mapDispatchToProps = (dispatch, ownProps) => {

  let userName = ownProps.match.params.userName || "_all";

  return {
    loadPosts: () => dispatch(loadPosts(userName)),
    loadUser: () => dispatch(loadUsers(userName)),
    postPost: (userName, text) => dispatch(postPost(userName, text)),
    changeReplyInputVisibility: (postId, visible) => dispatch(changeReplyInputVisibility(postId, userName, visible))
  };
};


const UserPageContainer =  connect(mapStateToProps, mapDispatchToProps)(UserPage);

export default UserPageContainer;
