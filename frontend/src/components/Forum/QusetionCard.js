//The component renders a card-style view for a single question
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import user from '../../reducers/user';
// import user from '../../reducers/user';
import posts from '../../reducers/post';
import AnswerSection from './AnswerSection';
import formatDistance from 'date-fns/formatDistance';
import { SlLike } from 'react-icons/sl';
import { TiDelete } from 'react-icons/ti';
import { CiSaveDown2 } from 'react-icons/ci';
import { QuestionWrapper, CreatedAtText } from '../../GlobalStyles';
import { ButtonQuestionWrapperTop, ButtonQuestionWrapperBottom } from './ForumStyle';

  const QuestionCard = ({ item }) =>{
  
    const { id } = useParams()
    const accessToken = useSelector((store) => store.user.accessToken);
    const dispatch = useDispatch()
    const savedQuestion = useSelector(store => store.user.savedQuestion)
    const userId = useSelector((store) => store.user.id) 
  
    
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

  const onDisLike = (id) => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      }}
    fetch(`http://localhost:8080/posts/${id}/dislike`, options)
      .then(res => res.json())
      .then(() => showUpdatedList())
  }

  const onLike = (id) => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      }}
    fetch(`http://localhost:8080/posts/${id}/like`, options)
      .then(res => res.json())
      .then(() => showUpdatedList())
  }

  const onDelete = (id) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }}
    fetch(`http://localhost:8080/posts/${id}/delete`, options)
      .then(res => res.json())
      .then(() => { 
        showUpdatedList()
      })
    }

    const onSave = (questionId, userId) => {
    const options = {
       method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': accessToken,
      },
      // what to uppdate/save: the question, and the correct user id document it belongs to. 
      body: JSON.stringify({
        userId: userId,
        questionId : savedQuestion,
        savedQuestion: questionId
      }) 
    }
    fetch(`http://localhost:8080/posts/${questionId}/users/${userId}`, options)
      .then(res => res.json())
      .then(() => { 
        showUpdatedList()
      })
      }
 
  return (
<QuestionWrapper>
    <ButtonQuestionWrapperTop> 
      <button onClick={() => onSave(item._id, userId)}><CiSaveDown2 /></button>  
      <button onClick={() => onDelete(item._id)}><TiDelete/></button> 
    </ButtonQuestionWrapperTop>
    <>
      <div>{item.title}</div>
      <p>{item.message}</p>
      <CreatedAtText>{formatDistance(new Date(item.createdAt), Date.now())}</CreatedAtText> 
    </>
    <ButtonQuestionWrapperBottom>
      <button onClick={() => onLike(item._id)} ><SlLike />{item.likes}</button> 
    </ButtonQuestionWrapperBottom>
    <AnswerSection item={item}> </AnswerSection>
  </QuestionWrapper>
)}


export default QuestionCard

