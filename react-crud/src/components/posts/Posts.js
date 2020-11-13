import React, { Fragment, useContext, useEffect } from 'react';
import PostItem from './PostItem';
import Spinner from '../layout/Spinner';
import PostContext from '../../context/post/postContext';
import AlertContext from '../../context/contact/alertContext';

const Posts = () => {
  const postContext = useContext(PostContext);
  const { posts, error, getPosts, loading } = postContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line
  }, [posts]);

  if (posts.length === 0) {
    return <h4>Please add a post</h4>;
  }
  if(error){
    setAlert(error, 'danger');
    return;
  }
  return (
    <Fragment>
      {
        (!loading) ?
        (
          posts.map(post => <PosttItem post={post}/>)
        )
        :
        (<Spinner /> )
      }
    </Fragment>
  );
};

export default Posts;
