import React from 'react';
import Header from '../header/Header';
import PostCard from '../post-card/PostCard';
import { postsList } from '../../constants';
import Card from '../user-card/UserCard';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <div>Content</div>

      <div className="d-flex posts-container">
        {
          postsList.map((item, index) => {
            return (
              <Card post={item} key={item.id} /> 
            ) 
          })
        }
      </div>
    </div>
  );
};

export default App;
