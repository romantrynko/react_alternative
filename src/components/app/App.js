import React from 'react';
import { Header } from '../header/HeaderFromLecture'
import { usersList, postsList, allComments } from '../../constants';
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
          usersList.map(item => {
            return (
              <UserCard user={item} key={item.id} />
            )
          })
        }
      </div>

      <div className='d-flex posts-container'>
        {
          postsList.map((item, index) => {
            const user = usersList.find(user => user.id === item.user_id);
            const author = user ? `${user.first_name} ${user.last_name}` : '';
            const comments = allComments.filter(comment => comment.post_id === item.id);

            return <PostCard
              post={item}
              key={item.id}
              hasImage={index % 2 !== 0}
              author={author}
              comments={comments}
            />
          })
        }
      </div>


      

      <Footer />
    </div>
  )
}

export default App;