import React, { useEffect, useState} from "react";
import { useSelector, useDispatch} from "react-redux";
import { useNavigate, useParams, Params } from "react-router-dom";
import { BASE_URL } from "../../utils/utils";
import DeleteUser from "./DeleteUser";

const MyProfilePage = ({}) => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const username = useSelector((store) => store.user.username);
  // const [userProfile, setUserProfile] = useState({});
  const [userProfile, setUserProfile] = useState({ savedQuestion:[]});
  const user = useSelector((store)=> store.user.motivation)
  //const [savedQuestion, setSavedQuestion] = useState([]);
  const navigate = useNavigate()
  const { id } = useParams()
    
  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }}, [accessToken])
  
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": accessToken
      }}
      fetch(`${BASE_URL}/users/${id}`, options)
        .then(res => res.json())
        .then(data => {
          setUserProfile(data)
          console.log("data",data)
          // console.log(typeof data)
          //setSavedQuestion(data.savedQuestion);
           // console.log('Saved questions is a type of', typeof savedQuestion, savedQuestion)
        })
        .catch(error => console.error(error))
      }, []);  
     // console.log('Saved questions is a type of', typeof savedQuestion, savedQuestion)


  return (
    <> 
   
    
    <div>
      {userProfile.savedQuestion.map((item, index) => ( 
        console.log("index", index),
        console.log("item", item),
        console.log("userprofile", userProfile),
        
        <div key={index}>
          <p>motivation: {userProfile.motivation}</p>
          {/* Display the properties of the item */}
          <p>Name: {item.name}</p>
          <p>Age: {item.age}</p>
          {item.born && <p>Born Happy: {item.born.happy}</p>}
        </div>
      ))}
    </div>
    <p> <DeleteUser/>Delete user</p>
    <p>{user}</p>
    </> 
   
  
);
};
//In this code, I've initialized userProfile with an empty array in the savedQuestion property. This matches the structure of your API response. Inside the return section, I'm using .map() to iterate over the savedQuestion array and display the properties of each item. I've also added a conditional rendering check for the born property to handle cases where it might be present or not.






//     <> 
//     <p>{username}</p>
//     <div>
//       {userProfile.items && userProfile.items.map((item) => (
//         console.log(userProfile), 
//         <div key={item._id}>
//           {/* Display the properties of the item */}
//           <p>Age: {item.age}</p>
//           <p>Name: {item.name}</p>
//         </div>
//       ))}
//     </div> 
//   </>
// );
// };
//By adding the {userProfile.items && ...} check, you ensure that the map() function is only executed when userProfile.items is defined. This prevents the "Cannot read properties of undefined" error and safely renders the items once the API response is received and the state is updated.








//     <> 
//     <div>
//       {userProfile.items.map((item) => (
//         <div key={item._id}>
//           {/* Display the properties of the item */}
//           <p>Age: {item.age}</p>
//           <p>Name: {item.name}</p>
//         </div>
//       ))}
//     </div> 
//   </>
// );
// };
//    <> 
//   <p>{username}</p> 
//   <p>{userProfile.username}</p>
//   <p>{userProfile.savedQuestion.age}</p>
//   <DeleteUser/> 
//   </>
   
// )}
  
export default MyProfilePage;      
  
{/* <div>
    {savedQuestion.map((question) => (
      console.log(question),
      <div key={question.name}>
        <p>{question.age}</p>
        <p>{question.name}</p>
      </div>
    ))}
  </div> */}
  
  
 