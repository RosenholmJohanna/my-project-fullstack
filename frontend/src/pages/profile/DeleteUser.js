import React, { useEffect, useState} from "react";
import { useSelector, useDispatch} from "react-redux";
import { Link, useNavigate, useParams, Params} from "react-router-dom";
import user from "../../reducers/user";
import { BASE_URL } from "../../utils/utils";
import { AnswerButton } from "../../components/QUIZ/QuizStyles";

const DeleteUser = () => {
  const { id } = useParams()
  const accessToken = useSelector((store) => store.user.accessToken)
  const dispatch = useDispatch();
  //const history = useHistory();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false)

  // const onDeletingUser = async(id) => {
  //   setIsDeleting(true);

  //   try {
  //       await onDeleteUserApi(id);
  //       navigate("/");
  //       // onDeleteUser();
  //       // push to history?
  //   }
  //   catch(error) {
  //       console.log('Error deleting user:', error);
  //       setIsDeleting(false);
  //   }}
  
    const onDeleteUser = (id) => {
        console.log("delete id", id)
        const options = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": accessToken
          }}
        fetch(`${BASE_URL}/user/${id}/delete`, options)
          .then(res => res.json())
          .then(() => { 
            dispatch(user.actions.setAccessToken(null))
            dispatch(user.actions.setUsername(null)); 
            localStorage.removeItem("userReduxState")
            //onDeletingUser((id)); 

            })
          .catch(error => console.error(error))
        }
    
return (
<>
 {/* <button onClick={onDeleteUser()} to="/"> <TbLogout /></button>   */}
{/* <link onClick={onDeleteUser} to="/"> delete account </link> */}
{/* <Link onClick={() => onDeleteUser(id)} to="/" >delete user</Link>   */}
{isDeleting ? (
    <p>is deletein user profile...</p>
) : (
<AnswerButton><Link to="/" onClick={() => onDeleteUser(id)}>Delete Account</Link></AnswerButton>
)}
</>
)}
  
export default DeleteUser; 



/*
const MyComponent = () => {
  const history = useHistory();
  const [isDeleting, setIsDeleting] = useState(false);

  const onDeleteUser = async (id) => {
    setIsDeleting(true);

    try {
      // Perform the deletion logic here
      await deleteUserData(id);

      // If deletion is successful, navigate to the desired page
      history.push('/target-page');
    } catch (error) {
      // Handle any error that occurs during deletion
      console.log('Error deleting user:', error);
      setIsDeleting(false);
    }
  };

  return (
    <div>
      {isDeleting ? (
        <p>Deleting user account...</p>
      ) : (
        <button onClick={() => onDeleteUser(id)}>
          Delete Account
        </button>
      )}
    </div>
  );
};

*/

// const DeleteUser = () => {
//   const accessToken = useSelector((store) => store.user.accessToken);
//   const { id } = useParams()

// //   const onDeleteUser = (id) => {
// //     const options = {
// //       method: 'DELETE',
// //       headers: {
// //         'Content-Type': 'application/json'
// //     }}
// //     fetch(`http://localhost:8080/user/${id}/delete`, options)
// //       .then(res => res.json())
// //       .then(() => { 
// //         showUpdatedList()
// //       })
// //       .catch(error => console.error(error))
// //     }

//     const onDeleteUser = (id) => {
//         console.log("delete id", id)
//         const options = {
//           method: 'DELETE',
//           headers: {
//             'Content-Type': 'application/json',
//             "Authorization": accessToken
//           }}
//         fetch(`${BASE_URL}/user/${id}/delete`, options)
        
//           .then(res => res.json())
//           .then(() => { 
//             })
//           .catch(error => console.error(error))
//         }

// return (
// <>
//  {/* <button onClick={onDeleteUser()} to="/"> <TbLogout /></button>   */}
// {/* <link onClick={onDeleteUser} to="/"> delete account </link> */}
// {/* <Link onClick={() => onDeleteUser(id)} to="/" >delete user</Link>   */}
// <Link to="/" onClick={() => onDeleteUser(id)}>Delete Account</Link>
// </>
// )}
  
// export default DeleteUser; 


//   const onDeleteUser = (id) => {
//     const options = {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json'
//     }}
//     fetch(`http://localhost:8080/user/${id}/delete`, options)
//       .then(res => res.json())
//       .then(() => { 
//         showUpdatedList()
//       })
//       .catch(error => console.error(error))
//     }
