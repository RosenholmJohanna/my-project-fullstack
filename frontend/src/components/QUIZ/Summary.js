import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { quiz } from '../../reducers/quiz'
import { AnswerButton, CurrentQuizWrapper } from './QuizStyles'
import { BASE_URL } from '../../utils/utils'
import user from '../../reducers/user'
import { useParams, useNavigate } from 'react-router-dom'

export const Summary = ({ score, setScore }) => {
  const dispatch = useDispatch()
  const answerSummary = useSelector((store) => store.quiz.answers)
  const userId = useSelector((store)=> store.user.id)
  const {id} = useParams()
  const navigate = useNavigate();


  // Function to update motivation
  const updateMotivation = async (newScore) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}/updateMotivation`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ score: newScore, userId: userId }), 
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error("Error updating motivation:", error);
    }
  };

  // const handleRestart = () => {
  //   dispatch(quiz.actions.restart(setScore(0))); // Reset the quiz state
  // };

  // const handleSaveScore = () => {
  //   updateMotivation(score)
  //   // navigate(`/profile/${userId}`);
  //   console.log("handlesave")
  // };

  return (
    <>
    <CurrentQuizWrapper>
      <div>
        <p>My motivation balance: <>{score} / 3</></p>
        <p>{score >= 3 && ('I feel Motivated!')}</p>
        <p>{score == 2 && ('I feel motivated but a bit tired')}</p>
        <p>{score == 1 && ('Not feeling great today')}</p>
        <p>{score == 0 && ('Check todays motivation')}</p>
      </div>
      <div>
        {answerSummary.map((item) => {
          return (
            <div key={item.questionId}></div>
          )
        })}
      </div>

       <AnswerButton type="button" onClick={() => dispatch(quiz.actions.restart(setScore(0)))}>Start</AnswerButton>  
       <AnswerButton type="button" onClick={() => updateMotivation(score) && navigate(`/profile/${userId}`)}>Save</AnswerButton>  
      {/* <AnswerButton type="button" onClick={handleRestart}>Restart</AnswerButton>   */}
      {/* <AnswerButton type="button" onClick={handleSaveScore(id)}>Save</AnswerButton>   */}
      {/* <AnswerButton type="button" onClick={updateMotivation(score)}>Save</AnswerButton>  */}
    </CurrentQuizWrapper>
    </>
  )
}

//   return (
//     <CurrentQuizWrapper>
//       <div>
//         <p>My motivation balance: <>{score} / 3</></p>
//         <p>{score >= 3 && ('I feel Motivated!')}</p>
//         <p>{score == 2 && ('I feel motivated but a bit tired')}</p>
//         <p>{score == 1 && ('Not so motivated')}</p>
//         <p>{score == '' && ('start')}</p>
//       </div>
//       <div>
//         {answerSummary.map((item) => {
//           return (
//             <div key={item.questionId}></div>
//           );
//         })}
//       </div>
//       <AnswerButton type="button" onClick={handleRestart}>Restart</AnswerButton>
//     </CurrentQuizWrapper>
//   );
// };



// export const Summary = ({ score }) => {
//   const dispatch = useDispatch();
//   const answerSummary = useSelector((store) => store.quiz.answers);

//   // Function to update motivation
//   const updateMotivation = async (newScore) => {
//     try {
//       const response = await fetch('/api/updateMotivation', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ score: newScore, userId: 'YOUR_USER_ID_HERE' }), // Replace 'YOUR_USER_ID_HERE' with the actual user identifier
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       // Handle the response if needed.
//       const responseData = await response.json();
//       console.log(responseData);
//     } catch (error) {
//       console.error("Error updating motivation:", error);
//     }
//   };

//   const handleRestart = () => {
//     dispatch(quiz.actions.restart(setScore(0)); // Reset the quiz state
//     updateMotivation(0); // Update motivation to 0
//   };

//   return (
//     <CurrentQuizWrapper>
//       <div>
//         <p>My motivation balance: <>{score} / 3</></p>
//         <p>{score >= 3 && ('I feel Motivated!')}</p>
//         <p>{score == 2 && ('I feel motivated but a bit tired')}</p>
//         <p>{score == 1 && ('Not so motivated')}</p>
//         <p>{score == '' && ('start')}</p>
//       </div>
//       <div>
//         {answerSummary.map((item) => {
//           return (
//             <div key={item.questionId}></div>
//           );
//         })}
//       </div>
//       <AnswerButton type="button" onClick={handleRestart}>Restart</AnswerButton>
//     </CurrentQuizWrapper>
//   );
// };


