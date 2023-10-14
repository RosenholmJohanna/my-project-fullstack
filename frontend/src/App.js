import React, { useState }from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import Start from './pages/start/Start';
import Login from './pages/login/Login';
import { Header } from './components/Header/Header';
import Register from './pages/register/Register';
import MyProfilePage from './pages/profile/ProfilePage';
import ForumPage from './pages/forum/ForumPage';
import { Footer } from './components/footer/Footer';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';
import posts from './reducers/post';
import { quiz } from './reducers/quiz';
import QuizPage from './pages/QuizPage';



const reducer = combineReducers({
  user: user.reducer,
  posts: posts.reducer,
  quiz: quiz.reducer
});
const store = configureStore({reducer});


export const App = () => {
return (
  <BrowserRouter>
  <Provider store={store}>
    <Header/>
      <Routes>
         <Route path='/' element={<Start/>}></Route> 
        <Route path='/login' element={<Login/>}></Route> 
         <Route path='/register' element={<Register/>}></Route>  
        <Route path='/profile/:id' element={<MyProfilePage/>}></Route> 
        <Route path='/posts' element={<ForumPage />}>  </Route>  
         <Route path='/quiz/:id' element={<QuizPage />}></Route> 
      </Routes>
     <Footer />
  </Provider>
</BrowserRouter>
  )
}

