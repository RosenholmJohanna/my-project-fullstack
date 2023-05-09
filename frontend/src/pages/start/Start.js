import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { useNavigate} from "react-router-dom";
import { 
  StartContainer,
  WelcomeText,
  TextWrapper,
  StartText,
  StartTextTwo,
  ButtonStart,
} from "./StartStyle";


const Start = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const userId = useSelector((store) => store.user.id)
  const navigate = useNavigate();
  
  useEffect(() => {
    if (accessToken) {
      navigate(`/profile/${userId}`);
  }}, [accessToken])

  const goLogin = () => {
    navigate("/Login")
  }
  return(
        <StartContainer>
        <WelcomeText>Welcome to Planet Space</WelcomeText>
          <TextWrapper>
            <StartText> "Did you know there are more stars in space than there are grains of sand in the world?"</StartText>
            <StartTextTwo>Want more space?</StartTextTwo>
             <ButtonStart type="button" onClick={goLogin}> Give me some space 🚀</ButtonStart> 
        </TextWrapper> 
        </StartContainer>
   ) 
}
export default Start;





