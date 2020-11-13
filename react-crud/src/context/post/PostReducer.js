import {
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  SET_CURRENT,
  SET_LOADING,
  UPDATE_POST,
  POST_ERROR
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return{
        ...state,
        loading:true
      };

    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };

    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false
      };

    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map(post =>  post.Id === action.payload.Id ? action.payload : post),
        loading: false
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(
          post => post.Id !== action.payload
        ),
        loading: false
      };

    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };

    case POST_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
