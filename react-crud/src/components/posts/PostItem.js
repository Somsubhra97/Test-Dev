import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/post/postContext';

const PostItem = ({ post }) => {
  const postContext = useContext(PostContext);
  const { deletePost, setCurrent } = postContext;

  const { Id, title, content } = post;

  const onDelete = () => {
    deletePost(Id);
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {title}
      </h3>
      <ul className='list'>
        {content && (
          <li>
           {content}
          </li>
        )}
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(post)}
        >
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  post: PropTypes.object.isRequired
};

export default PostItem;
