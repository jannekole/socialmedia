import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadPosts, loadUsers, postPost, changeReplyInputVisibility , getFollows, follow} from '../actions/actions';

import Posts from '../components/Posts';
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
    this.props.loadUser();


    window.scrollTo(0, 0);
  }


  handleSubmit(e) {
    this.props.postPost(this.props.thisUser.user.userName, this.state.input);
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
        thisUser={this.props.thisUser}
        follows={this.props.follows}
        follow={this.props.follow}
      />;
    }

    //If this is the user's own page or front page, render reply box
    if (this.props.thisUser.isLoggedIn && (this.props.all || (this.props.user && this.props.user.userName === this.props.thisUser.user.userName))) {
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
            routerKey={this.props.routerKey}
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
  routerKey: PropTypes.string,
  thisUser: PropTypes.object.isRequired,
  all: PropTypes.bool.isRequired,
  follows: PropTypes.array.isRequired,
  follow: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {


  let userFilter = ownProps.match.params.userName;
  let all = !userFilter;

  let posts = state.posts.items;
  let contentIsDoneFetching = posts ? (state.posts.isDoneFetching[userFilter] === true) : true;

  let user;
  if (!all) {
    user = state.users.byUserName[userFilter];
  }

  let thisUser = state.thisUser;

  let routerKey = ownProps.location.key;

  let follows = state.follows;

  return {
    posts,
    contentIsDoneFetching,
    user,
    all,
    thisUser,
    routerKey, // updates component when linked from same page
    follows
  };
};



const mapDispatchToProps = (dispatch, ownProps) => {

  let userName = ownProps.match.params.userName || "_all";

  return {
    loadPosts: (thisUserName) => dispatch(loadPosts(userName, thisUserName)),
    loadUser: () => dispatch(loadUsers(userName)),
    getFollows: (thisUserId) => dispatch(getFollows(thisUserId, null)),
    follow: (followerId, followingId, unFollow) => dispatch(follow(followerId, followingId, unFollow)),
    postPost: (userName, text) => dispatch(postPost(userName, text)),
    changeReplyInputVisibility: (postId, visible) => dispatch(changeReplyInputVisibility(postId, userName, visible))
  };
};


const UserPageContainer =  connect(mapStateToProps, mapDispatchToProps)(UserPage);

export default UserPageContainer;
