import React from 'react';
import Post from '../components/Post';

class PostContainer extends React.Component {


  render() {


    return (
      <Post post={this.props.post}/>
    );
  }

}


export default PostContainer;
