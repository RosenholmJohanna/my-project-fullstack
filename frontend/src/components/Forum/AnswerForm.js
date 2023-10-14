import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import posts from '../../reducers/post';
// import { SendButton, Input } from '../../../GlobalStyles';
// import { AnswerFormWrapper } from './answersStyle';


  const NewAnswer = ({item}) => {
    const accessToken = useSelector((store) => store.user.accessToken);
    const [answer, setAnswer] = useState('')
    const dispatch = useDispatch()

  const updatedAnswerList = () => {

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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
  }

  const onAnswerSubmit = (event, id) => {
    event.preventDefault()
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify({ answer: answer })
    }
    fetch(`http://localhost:8080/posts/${id}/answer`, options)
      .then(res => res.json())
      .then(() => updatedAnswerList()) 
      setAnswer('')
  }
  
  return (
    
    <form onSubmit={(event) => onAnswerSubmit(event, item._id)}> 
    <div>
      <input 
      type="text" 
      id="Answer" 
      label ='answer'
      placeholder='Type Answer'
      value={answer}
      onChange={event => setAnswer(event.target.value)}/>
      <button type="submit">Send</button>
      </div>
    </form>
    
  )
} 

export default NewAnswer;
