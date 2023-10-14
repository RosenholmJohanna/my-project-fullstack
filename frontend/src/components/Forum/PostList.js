import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import posts from '../../reducers/post';
import QuestionCard from './QusetionCard';



const PostList = () => {
 //const accessToken = useSelector((store) => store.user.accessToken);
 const { id } = useParams()
 const postsList = useSelector(store => store.posts.items)
 const dispatch = useDispatch()


  useEffect(() => {
    const options = {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
        // "Authorization": accessToken
      },
  }
     fetch("http://localhost:8080/posts", options) 
    .then(res => res.json())
    .then(data => {
      if (data.success) {
         dispatch(posts.actions.setItems(data.response))
      } else {
          dispatch(posts.actions.setError(data))
        }
      })
  }, [])


  return (
    <div>
    {postsList.map(item => (
      <QuestionCard
       key={item._id}
       item = {item}
       />
   ))}
  </div>
  )
}

export default PostList


// {postsList.map(item => (
//   <><div key={item._id}>

// {questionsList.map(item =>
//   <ForumWall
//     key={item._id} // []
//     item={item} />