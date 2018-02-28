// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
//
// import { loadPosts, loadUsers, postPost, changeReplyInputVisibility , getFollows, follow, changePostInput} from '../actions/actions';
//
// import Posts from '../components/Posts';
// import PostForm from '../components/PostForm';
// import UserPageTopInfo from '../components/UserPageTopInfo';
// 
// import LoginPageContainer from '../containers/LoginPageContainer';
//
// class UserPage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {input: ""};
//     this.handleInputChange = this.handleInputChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//   componentDidMount() {
//     window.scrollTo(0, 0);
//   }
//   handleSubmit(e) {
//     this.props.postPost(null, this.props.postInput);
//     e.preventDefault();
//   }
//   handleInputChange(e) {
//     this.props.changePostInput(e.target.value);
//   }
//   render() {
//     let userPageTop = null;
//     let postForm = null;
//
//     //if this is a userpage, render UserPageTopInfo
//     if (!this.props.all) {
//       userPageTop = <UserPageTopInfo
//         username={this.props.username}
//         user={this.props.user}
//         loadUser={this.props.loadUser}
//         thisUser={this.props.thisUser}
//         follows={this.props.follows}
//         follow={this.props.follow}
//         isLoading={this.props.userIsLoading}
//       />;
//     }
//
//     //If this is the user's own page or front page, render reply box
//     if (this.props.thisUser.isLoggedIn && (this.props.all || (this.props.user && this.props.user.username === this.props.thisUser.user.username))) {
//       postForm = <div className="post">
//         <PostForm id={""}
//           handleSubmit={this.handleSubmit}
//           handleInputChange={this.handleInputChange}
//           inputText={this.props.postInput}
//           rows={4}
//           disabled={this.props.postInputDisabled}>
//           Post something:
//         </PostForm>
//       </div>;
//     }
//
//     let username = this.props.match.params.username;
//     let posts = this.props.posts;
//     if (username) {
//       let { user } = this.props;
//       if (user) {
//         posts = this.props.posts.filter((post) => {
//           return (post.parentUserId === user._id);
//         });
//       }
//     }
//
//
//     return <div className="">
//
//       {userPageTop}
//       <div className="content">
//         <div className="postList">
//           {postForm}
//           {this.props.user || this.props.all ? <Posts
//             posts={posts}
//             isDoneFetching={this.props.contentIsDoneFetching}
//             loadPosts={this.props.loadPosts}
//             getFollows={this.props.getFollows}
//             changeReplyInputVisibility={this.props.changeReplyInputVisibility}
//             // routerKey={this.props.key}
//             thisUser={this.props.thisUser}
//
//           /> : null}
//         </div>
//       </div>
//     </div>;
//   }
// }
// UserPage.propTypes = {
//   posts: PropTypes.array.isRequired,
//   contentIsDoneFetching: PropTypes.bool.isRequired,
//   loadPosts: PropTypes.func.isRequired,
//   getFollows: PropTypes.func.isRequired,
//   loadUser: PropTypes.func.isRequired,
//   postPost: PropTypes.func.isRequired,
//   user: PropTypes.object,
//   changeReplyInputVisibility: PropTypes.func.isRequired,
//   match: PropTypes.object.isRequired,
//   thisUser: PropTypes.object.isRequired,
//   all: PropTypes.bool.isRequired,
//   follows: PropTypes.array.isRequired,
//   follow: PropTypes.func.isRequired,
//   postInput: PropTypes.string.isRequired,
//   changePostInput: PropTypes.func.isRequired,
//   postInputDisabled: PropTypes.bool,
//   username: PropTypes.string,
//   userIsLoading: PropTypes.bool,
// };
//
// const mapStateToProps = (state, ownProps) => {
//
//   let username = ownProps.match.params.username;
//   let userFilter = username || "_all";
//   let all = !username;
//
//   let posts = state.posts.items;
//   let contentIsDoneFetching = posts ? (state.posts.isDoneFetching[userFilter] === true) : true;
//
//   let user;
//   if (!all) {
//     user = state.users.byUserName[userFilter];
//   }
//
//   let thisUser = state.thisUser;
//   //
//   let key = ownProps.location.key;
//
//   let follows = state.follows;
//   let postInput = thisUser.postInput;
//   let postInputDisabled = thisUser.postInputDisabled;
//
//   let userIsLoading = state.loading.users[username];
//
//   return {
//     posts,
//     contentIsDoneFetching,
//     user,
//     all,
//     thisUser,
//     key, // updates component when linked from same page
//     follows,
//     postInput,
//     postInputDisabled,
//     username,
//     userIsLoading,
//   };
// };
//
//
//
// const mapDispatchToProps = (dispatch, ownProps) => {
//
//   let username = ownProps.match.params.username || "_all";
//
//   return {
//     loadPosts: (thisUserName) => dispatch(loadPosts(username, thisUserName)),
//     loadUser: (name) => dispatch(loadUsers(name)),
//     getFollows: (thisUserId) => dispatch(getFollows(thisUserId, null)),
//     follow: (followerId, followingId, unFollow) => dispatch(follow(followerId, followingId, unFollow)),
//     postPost: (username, text) => dispatch(postPost(username, text)),
//     changeReplyInputVisibility: (postId, visible) => dispatch(changeReplyInputVisibility(postId, username, visible)),
//     changePostInput: (text) => dispatch(changePostInput(text)),
//   };
// };
//
//
// const UserPageContainer =  connect(mapStateToProps, mapDispatchToProps)(UserPage);
//
// export default UserPageContainer;
