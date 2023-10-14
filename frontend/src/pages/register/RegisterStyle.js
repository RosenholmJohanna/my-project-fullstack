import styled from "styled-components";

export const LoginContainer = styled.div`
margin-top: 10%;
margin-bottom: 10%;
display: flex;
flex-direction: column;
justify-content: center;
 align-content: center; 
align-items: center;
text-align: center;

  @media (min-width: 768px) {
    margin-bottom: 20%;
  } 
  
  @media (min-width: 1024px) {
    margin-top: 3%;
    margin-bottom: 10%;
  } 

  a {
    text-decoration: none; 
    color: #657383;
    text-decoration: underline; 
  }
`
export const Input=styled.input`
`

export const LoginForm = styled.div`
justify-content: center; 
margin-top: 30%;
flex-direction: column;  
width: 80%;
padding: 2%;
background-color: #a7a6ba;
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
color: #000112;
`
export const LogintextTwo = styled.p `
font-weight: lighter;
margin-bottom: 5%; 
`

export const InfoText = styled.p`
margin-bottom: 5%;
margin-top: 0;
font-size: 0.65em;
`