import React, { useEffect, useState} from "react";
import { useSelector, useDispatch} from "react-redux";
import { useNavigate, useParams, Params} from "react-router-dom";
import user from "../../reducers/user";
import { BASE_URL } from "../../utils/utils";

const MyProfilePage = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  // const [userProfile, setUserProfile] = useState({}) 
  const navigate = useNavigate()
  const { id } = useParams()
    
    useEffect(() => {
        if (!accessToken) {
          navigate("/");
        }
      }, [accessToken])

      
  return (
   <> 
   User Page 
   </>
  )}
  
  export default MyProfilePage;      