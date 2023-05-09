import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { REGISTER_URL} from '../../utils/utils';
import user from '../../reducers/user';
import { LoginButton, RegisterLinkText } from '../login/LoginStyle';
import { 
  LoginContainer,
  Input,
  LoginForm,
  Logintext,
  InfoText,
  LogintextTwo 
} from "./RegisterStyle";



const Register = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("register"); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((store) => store.user.id) 
    
  useEffect(() => {
    if (accessToken) {
      navigate(`/profile/${userId}`);
    }}, [accessToken])

  const onFormSubmit =(event) => {
    event.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }, body: JSON.stringify({username: username, password: password})
    }
    fetch(REGISTER_URL(mode), options) 
      .then(response => response.json())
      .then(data => {
        if(data.success) { 
          batch(()=> {
            dispatch(user.actions.setUsername(data.response.username)); 
            dispatch(user.actions.setId(data.response.id))
            dispatch(user.actions.setAccessToken(data.response.accessToken));
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
    <LoginContainer>
    <LoginForm>
      <Logintext>Register</Logintext>  
        <LogintextTwo>Create account before visit Planet Space</LogintextTwo>  
          <form onSubmit={onFormSubmit}  onChange={()=>setMode("register")}>
            <label htmlFor="username">Username</label>
              <Input 
                required
                type="text" 
                id="username" 
                value={username} 
                onChange={e => setUsername(e.target.value)}/>
                <label htmlFor="Password">Password</label>

              <Input
                required 
                type="password" 
                id="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}/>
                <InfoText>Choose a minimum of 3 characters</InfoText>
                <label htmlFor="register"></label>
                <LoginButton type="submit">Submit</LoginButton>
          </form>
      </LoginForm>
      <Link to="/login"> <RegisterLinkText>Already a user? Log in here </RegisterLinkText> </Link> 
    </LoginContainer> 
  );
}

export default Register;



