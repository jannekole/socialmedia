import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadPosts, loadUsers, postPost, changeReplyInputVisibility , getFollows, follow, changePostInput} from '../actions/actions';

import Posts from '../components/Posts';
import PostForm from '../components/PostForm';
import UserPageTopInfo from '../components/UserPageTopInfo';

import LoginPageContainer from '../containers/LoginPageContainer';

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {input: ""};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {

    window.scrollTo(0, 0);
  }
  handleSubmit(e) {
    this.props.postPost(this.props.thisUser.user.userName, this.props.postInput);
    e.preventDefault();
  }
  handleInputChange(e) {
    this.props.changePostInput(e.target.value);
  }
  render() {
    let userPage = null;
    let postForm = null;

    //if this is a userpage, render UserPageTopInfo
    if (!this.props.all) {
      userPage = <UserPageTopInfo
        userName={this.props.userName}
        user={this.props.user}
        loadUser={this.props.loadUser}
        thisUser={this.props.thisUser}
        follows={this.props.follows}
        follow={this.props.follow}
      />;
    }

    //If this is the user's own page or front page, render reply box
    if (this.props.thisUser.isLoggedIn && (this.props.all || (this.props.user && this.props.user.userName === this.props.thisUser.user.userName))) {
      postForm = <div className="post">
        <PostForm handleSubmit={this.handleSubmit}
          handleInputChange={this.handleInputChange}
          inputText={this.props.postInput}
          rows={4}
          disabled={this.props.postInputDisabled}>
          Post something:
        </PostForm>
      </div>;
    }

    let userName = this.props.match.params.userName;
    let posts = this.props.posts;
    if (userName) {
      posts = posts.filter((post) => {
        return (post.user.userName === userName && !post.parentId);
      });
      if (posts.length > 0) {
        var userId = posts[0].user._id;
        posts = posts.concat(this.props.posts.filter((post) => {
          return (post.parentUserId === userId);
        }));
      }
    }

    return <div className="">

      {userPage}
      <div className="content">
        <div className="postList">
          {postForm}
          <Posts
            posts={posts}
            isDoneFetching={this.props.contentIsDoneFetching}
            loadPosts={this.props.loadPosts}
            getFollows={this.props.getFollows}
            changeReplyInputVisibility={this.props.changeReplyInputVisibility}
            routerKey={this.props.key}
            thisUser={this.props.thisUser}
          />
        </div>
      </div>
    </div>;
  }
}
UserPage.propTypes = {
  posts: PropTypes.array.isRequired,
  contentIsDoneFetching: PropTypes.bool.isRequired,
  loadPosts: PropTypes.func.isRequired,
  getFollows: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  postPost: PropTypes.func.isRequired,
  user: PropTypes.object,
  changeReplyInputVisibility: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  key: PropTypes.string,
  thisUser: PropTypes.object.isRequired,
  all: PropTypes.bool.isRequired,
  follows: PropTypes.array.isRequired,
  follow: PropTypes.func.isRequired,
  postInput: PropTypes.string.isRequired,
  changePostInput: PropTypes.func.isRequired,
  postInputDisabled: PropTypes.bool,
  userName: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {

  let userName = ownProps.match.params.userName;
  let userFilter = userName || "_all";
  let all = !userName;

  let posts = state.posts.items;
  let contentIsDoneFetching = posts ? (state.posts.isDoneFetching[userFilter] === true) : true;

  let user;
  if (!all) {
    user = state.users.byUserName[userFilter];
  }

  let thisUser = state.thisUser;

  let key = ownProps.location.key;

  let follows = state.follows;
  let postInput = thisUser.postInput;
  let postInputDisabled = thisUser.postInputDisabled;

  return {
    posts,
    contentIsDoneFetching,
    user,
    all,
    thisUser,
    key, // updates component when linked from same page
    follows,
    postInput,
    postInputDisabled,
    userName,
  };
};



const mapDispatchToProps = (dispatch, ownProps) => {

  let userName = ownProps.match.params.userName || "_all";

  return {
    loadPosts: (thisUserName) => dispatch(loadPosts(userName, thisUserName)),
    loadUser: (name) => dispatch(loadUsers(name)),
    getFollows: (thisUserId) => dispatch(getFollows(thisUserId, null)),
    follow: (followerId, followingId, unFollow) => dispatch(follow(followerId, followingId, unFollow)),
    postPost: (userName, text) => dispatch(postPost(userName, text)),
    changeReplyInputVisibility: (postId, visible) => dispatch(changeReplyInputVisibility(postId, userName, visible)),
    changePostInput: (text) => dispatch(changePostInput(text)),
  };
};


const UserPageContainer =  connect(mapStateToProps, mapDispatchToProps)(UserPage);

export default UserPageContainer;
