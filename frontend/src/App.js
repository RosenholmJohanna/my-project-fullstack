import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import Start from './pages/start/Start';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import MyProfilePage from './pages/profile/ProfilePage';
import { Footer } from './components/footer/Footer';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';


const reducer = combineReducers({
  user: user.reducer,
});

const store = configureStore({reducer});

export const App = () => {
return (
  <BrowserRouter>
  <Provider store={store}>
      <Routes>
        <Route path='/' element={<Start/>}></Route>
        <Route path='/login' element={<Login/>}></Route> 
        <Route path='/register' element={<Register/>}></Route> 
        <Route path='/profile/:id' element={<MyProfilePage/>}></Route> 
      </Routes>
      <Footer />
  </Provider>
</BrowserRouter>
  )
}