import React, { useReducer } from 'react';
import axios from 'axios';
import PostContext from './PostContext';
import postReducer from './PostReducer';
import {
  GET_POSTS,
  ADD_POSTS,
  DELETE_POST,
  SET_CURRENT,
  UPDATE_POST,
  POST_ERROR
} from '../types';

const ContactState = props => {
  const initialState = {
    posts: null,
    current: null,
    loading: true,
    error: null
  };

  const [state, dispatch] = useReducer(postReducer, initialState);

  // Get Contacts
  const getContacts = async () => {
    try {
      dispatch({type:SET_LOADING});
      const res = await axios.get('/api/posts');

      dispatch({
        type: GET_POSTS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Add Contact
  const addContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    dispatch({type:SET_LOADING});
    try {
      const res = await axios.post('/api/posts', contact, config);

      dispatch({
        type: ADD_POSTS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Delete Contact
  const deleteContact = async id => {
    try {
      await axios.delete(`/api/posts/${id}`);
      dispatch({type:SET_LOADING});
      dispatch({
        type: DELETE_POST,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Update Contact
  const updateContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    dispatch({type:SET_LOADING});
    try {
      const res = await axios.put(
        `/api/posts/${contact._id}`,
        contact,
        config
      );

      dispatch({
        type: UPDATE_POST,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: err.response.msg
      });
    }
  };


  // Set Current Contact
  const setCurrent = post => {
    dispatch({ type: SET_CURRENT, payload: post });
  };

return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        current: state.current,
        error: state.error,
        addPost,
        deletePost,
        setCurrent,
        updatePost,
        getPosts,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;