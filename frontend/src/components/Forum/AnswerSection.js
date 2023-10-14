import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import NewAnswer from './AnswerForm';
import formatDistance from 'date-fns/formatDistance';
import posts from '../../reducers/post';
import { SlLike } from 'react-icons/sl';
import { CreatedAtText } from '../../GlobalStyles';
import { ButtonQuestionWrapperTop } from './ForumStyle';
import { TiDelete } from 'react-icons/ti';



const AnswerSection = ({item}) => {   
  const accessToken = useSelector((store) => store.user.accessToken);
  const answers = [...item.answers]
  const dispatch = useDispatch()
   
  const showUpdatedList = () => {
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

  const onLikeAnswer = (answerId, questionId) => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      }}
     
    fetch(`http://localhost:8080/posts/${answerId}/answers/${questionId}/like`, options)
      .then(res => res.json())
      .then(() => showUpdatedList())
  }

  const onDeleteAnswer = (questionId, answerId) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }}
    fetch(`http://localhost:8080/posts/${questionId}/answers/${answerId}`, options)
      .then(res => res.json())
      .then(() => showUpdatedList()
    )}


  return (
    <div>
      {answers.map(answer =>
      <div item={item} key={answer._id}>
      <ButtonQuestionWrapperTop><button onClick={() => onDeleteAnswer(item._id, answer._id)}><TiDelete/></button> </ButtonQuestionWrapperTop>  
        <div>
          <p>{answer.answer}</p>
        </div> 
      <CreatedAtText>{formatDistance(new Date(answer.createdAt), Date.now())}</CreatedAtText> 
       <button onClick={() => onLikeAnswer(item._id, answer._id,)} ><SlLike />{item.likes}</button>
      
      </div>
      )}
      <NewAnswer item={item} />
    </div>
  )
}

export default AnswerSection