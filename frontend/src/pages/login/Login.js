import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { LOGIN_URL } from '../../utils/utils';
import user from '../../reducers/user';
import { 
  LoginContainer,
  LoginForm,
  Logintext, 
  LogintextSub,
  LoginButton,
  RegisterLinkText
} from './LoginStyle';


const Login = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  useEffect(() => {
    if (accessToken) {
      navigate("/profile");
  }}, [accessToken])

  const onFormSubmit =(event) => {
    event.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }, body: JSON.stringify({username: username, password: password})
    }
     fetch(LOGIN_URL(mode), options) 
      .then(response => response.json())
      .then(data => {
        if(data.success) { 
          batch(()=> {
            dispatch(user.actions.setUsername(data.response.username)); 
            dispatch(user.actions.setId(data.response.userId))
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setSavedQuestion(data.response.savedQuestion));
            dispatch(user.actions.setError(null));
          });
        } else {
          batch (() => {
            dispatch(user.actions.setUsername(null)); 
            dispatch(user.actions.setId(null))
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setError(data.response));
          });
          }
      })
    }
  return (
  <>
    <LoginContainer>
      <LoginForm> 
        <Logintext>Log In</Logintext>  
        <LogintextSub>Please log in with your username and password to visit Planet Space</LogintextSub>   
        <form onSubmit={onFormSubmit} onChange={()=>setMode("login")}>
        <label htmlFor="username">Username</label>
         <input 
          placeholder="username"
          required=""
          type="username" 
          id="username" 
          value={username} 
          onChange={e => setUsername(e.target.value)} />
          <label htmlFor="Password">Password</label>
          
         <input
          placeholder="password"
          required=""
          type="password" 
          id="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} />
          <label htmlFor="login"></label>
           <LoginButton>Submit</LoginButton> 
        </form>
      </LoginForm> 
      <Link to="/register">
      <RegisterLinkText>Register here if new to Planet Space </RegisterLinkText>
      </Link> 
    </LoginContainer>
  </>
  );
}

export default Login;



