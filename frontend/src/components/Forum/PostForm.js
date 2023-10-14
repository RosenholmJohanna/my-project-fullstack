import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import posts from '../../reducers/post';
import { AnswerButton } from '../QUIZ/QuizStyles';


const NewPost = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const [showForm, setShowForm] = useState(false); 
  const [closeForm, setCloseForm] = useState(false); 
  const [message, setMessage] = useState('')
  const [title, setTitle] = useState('');
  const userId = useSelector((store) => store.user.id) 
  const dispatch = useDispatch()
  
  const addPostToList = () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": accessToken
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
  }

  const onFormSubmit = (event) => {
    event.preventDefault()
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": accessToken
        }, body: JSON.stringify({ author: userId, title: title, message: message })
      }
      fetch("http://localhost:8080/posts", options)
        .then(res => res.json())
        .then((data) => {  
            if  (data.success) {
              addPostToList()
              setMessage('')
              setTitle('')
              setShowForm(false);
          }
        }); 
    }


//     if(title.trim() && message.trim())
//     { !addPostToList()}
//      {
//       if  (data.success) {
//         addPostToList()
//         setMessage('')
//         setTitle('')
//         setShowForm(false);
//     }}
//   }); 
// }


  
  return (
    <div>
    {!showForm && (
      <AnswerButton onClick={() => setShowForm(true)}>Open Form</AnswerButton>
    )}
    {showForm && (
      <form onSubmit={onFormSubmit}>
        <div>
          <input
            label="title" 
            placeholder='Type Title' 
            id="newTitle" 
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <input
            label="post"
            placeholder='Type post'
            id="newPost"
            type="text"
            value={message} 
            onChange={event => setMessage(event.target.value)} 
          />
        </div>
        <AnswerButton type="submit">Send</AnswerButton>
        {showForm && (
      <AnswerButton onClick={() => setCloseForm(true)}>Close Form</AnswerButton>
    )}
      </form>
    )} 
  </div>
);
}

export default NewPost;

