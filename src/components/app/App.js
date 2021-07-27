import React from 'react';
import { Header } from '../header/HeaderFromLecture'
import { usersList, postsList } from '../../constants';
import { Footer } from './../footer/Footer';
import { UserCard } from '../user-card/UserCard';
import { PostCard } from '../post-card/PostCard';

import './App.css';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className='App'>
      <Header />

      <div className='d-flex posts-container'>
        {
          usersList.map((item, index) => {
            return (
              <UserCard user={item} key={item.id}/>
            )
          })
        }
      </div>

      <div className='d-flex posts-container'>
        {
          postsList.slice(1, 10).map((item, index) => {
            const odd = index % 2 !== 0;

            return (
              <PostCard post={item} key={item.id} hasImage={odd} />
            )
          })
        }
      </div>
      <Footer />
    </div>
  )
}

export default App;