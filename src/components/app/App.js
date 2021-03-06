import React from 'react';
import  Header  from '../header/Header';
import  PostCard  from '../post-card/PostCard';
import { postsList } from '../../constants';

function App() {
  return (
    <div className="App">
      <Header />
      <PostCard post={postsList[0]}/>
    </div>
  );
};

export default App;
