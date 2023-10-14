import styled from "styled-components";

export const HeaderContainer = styled.header`
padding-top: 1%;
text-align: center;
display: flex;  
justify-content: space-between; 
align-items: center; 
border-bottom: 1px solid white;

  @media (min-width: 768px) {
    margin-left: 10%;
    margin-right: 10%;
  } 

  @media (min-width: 1024px) {
    margin-left: 10%;
    margin-right: 10%;
  } 
`
export const HeaderText = styled.h1`
font-weight: lighter;
margin: 4%;

  @media (min-width: 768px) {
    margin-right: 20%;
  } 

  @media (min-width: 1024px) {
    margin-right: 40%;
  } 
`
