import React ,{ useState }from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FooterContainer, FooterText } from './footerStyle';
import user from '../../reducers/user';
import { TbUserCircle, TbLogout } from 'react-icons/tb';

export const Footer = () => {
  const username = useSelector((store) => store.user.username);
  const dispatch = useDispatch()

  const onLogOut = () => {
    console.log("logged out user", localStorage)
    dispatch(user.actions.setAccessToken(null))
    dispatch(user.actions.setUsername(null)); 
    localStorage.removeItem("userReduxState")
  }
  return (
  <FooterContainer>
    <FooterText> <TbUserCircle /> {username} </FooterText>
    <Link onClick={onLogOut} to="/"> <TbLogout /></Link>
   </FooterContainer>
  ) 
}

