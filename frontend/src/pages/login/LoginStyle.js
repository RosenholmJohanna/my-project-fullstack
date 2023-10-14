import styled from 'styled-components';

export const LoginButton=styled.button`
width: 15em;
height:40px;
border-radius:25px;
background-color: #c4aead;
margin-bottom: 5%;
margin-top: 10%;
justify-content: center;
border: 0.5px solid white
`

export const RegisterLinkText = styled.p `
margin-top: 3%;
color: #F0F6FC;
text-decoration: underline;
a {
  text-decoration: none; 
  color: white;
  text-decoration: none; 
}
`

export const LoginContainer = styled.div`
margin-top: 10%;
margin-bottom: 50%;
display: flex;
flex-direction: column;
justify-content: center;
 align-content: center; 
align-items: center;
text-align: center;

  @media (min-width: 768px) {
  margin-bottom: 30%;
  } 
  
  @media (min-width: 1024px) {
  margin-top: 3%;
  margin-bottom: 15%;
  } 

a {
  text-decoration: none; 
  color: white;
  text-decoration: none; 
}
`

export const LoginForm = styled.div`
justify-content: center; 
margin-top: 30%;
flex-direction: column;  
width: 80%;
padding: 2%;
background-color: #98afc7;
border-radius: 5%;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

 @media (min-width: 768) {
  margin-top: 10%;
  width: 15%;
  flex-direction: flex-wrap;
  } 

 @media (min-width: 1024px) {
  margin-top: 5%;
  width: 40%;
  flex-direction: flex-wrap;
  } 
`
export const Logintext = styled.h3 `
margin: 2%;
`

export const LogintextSub = styled.p `
font-weight: lighter;
margin-bottom: 5%; 
`
