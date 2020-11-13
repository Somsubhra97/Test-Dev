import Posts from '..posts/Posts';
import PostForm from '..postsPostForm';

const Home = () => {
  return (
    <div className='grid-2'>
      <div>
        <PostForm />
      </div>
      <div>
        <Posts />
      </div>
    </div>
  );
};

export default Home;
