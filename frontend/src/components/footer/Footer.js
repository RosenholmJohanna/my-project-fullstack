import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { FooterContainer, FooterText } from './footerStyle';
import user from '../../reducers/user';
import { TbUserCircle, TbLogout } from 'react-icons/tb';

export const Footer = () => {
  
  const userId = useSelector((store) => store.user.id)
  const username = useSelector((store) => store.user.username);
  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch()
  const { id } = useParams()

  const onLogOut = () => {
    dispatch(user.actions.setAccessToken(null))
    dispatch(user.actions.setUsername(null)); 
    localStorage.removeItem("userReduxState")
  }

  return (
  <FooterContainer>
    <FooterText> <TbUserCircle /> {username} </FooterText>
    <p><Link to= {`/profile/${userId}`}>Profil</Link></p>
    <p><Link to="/posts">Forum</Link></p>
    <p><Link to={`/quiz/${userId}`}> Quiz</Link></p>
    <p><Link onClick={onLogOut} to="/">Log out <TbLogout /></Link></p>
   </FooterContainer>
  ) 
}

