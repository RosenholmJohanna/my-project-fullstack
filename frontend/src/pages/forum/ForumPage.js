import React, { useEffect } from "react"
import PostList from "../../components/Forum/PostList"
import NewPost from "../../components/Forum/PostForm"


const ForumPage = () => {
    // const dispatch = useDispatch();
      
  
    // useEffect(()=> {
    //   const options = {
    //     method: "GET", 
    //     headers: {
    //       "Content-Type": "application/json",
    //     //   "Authorization": accessToken
    // },}
    //   fetch("http://localhost:8080/posts", options) 
    //     .then(res => res.json())
    //     .then(data => {
    //       if(data.success) {
    //         dispatch(posts.actions.setItems(data.response)); 
    //         dispatch(posts.actions.setError(null));
    //       } else {
    //           dispatch(posts.actions.setItems([]));
    //           dispatch(posts.actions.setError(data.response));
    //         }
    //       })
    //   }, [dispatch]) 

return (
    <>
    <h1>Forum Wall</h1>
    <NewPost />
    <PostList />
    </>
)
}

export default ForumPage
    