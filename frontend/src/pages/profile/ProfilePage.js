import React, { useEffect} from "react";
import { useSelector} from "react-redux";
import { useNavigate} from "react-router-dom";


const MyProfilePage = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const navigate = useNavigate()
    
    useEffect(() => {
        if (!accessToken) {
          navigate("/");
        }
      }, [accessToken])


  return (
   <> User Page </>
  )}
  
export default MyProfilePage;      
 

           

   



       
   
   



  

 

 

