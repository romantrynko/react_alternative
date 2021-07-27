import React from 'react';
import { Header } from '../header/HeaderFromLecture'
import { usersList } from '../../constants';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Footer } from './../footer/Footer';
import { UserCard } from '../user-card/UserCard';

function App() {
  return (
    <div className='App'>
      <Header />
      <UserCard user={usersList[0]} />
      <Footer />
    </div>
  )
}

export default App;