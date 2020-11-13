import React, { useState, useContext, useEffect } from 'react';
import PostContext from '../../context/post/PostContext';

const PostForm = () => {
  const postContext = useContext(PostContext);

  const { addPost, updatePost,  current } = PostContext;

  useEffect(() => {
    if (current !== null) {
      setPost(current);
    }
    else {
      setPost({
        title: '',
        content: ''
      });
    }
  }, [postContext, current]);

  const [post, setPost] = useState({
   title: '',
   content: ''
  });

  const { title, content } = post;

  const onChange = e =>
    setPost({ ...post, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addPost(post);
    }
    else {
      updatePost(post);
    }

  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit Post' : 'Add Post'}
      </h2>
      <input
        type='email'
        placeholder='Title'
        name='title'
        value={title}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Content'
        name='content'
        value={content}
        onChange={onChange}
      />
     </form>
  );
};

export default PostForm;
