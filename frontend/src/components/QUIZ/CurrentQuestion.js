import React, { useState }from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { quiz } from '../../reducers/quiz'
import { Summary } from './Summary'
import { AnswerButton, CurrentQuizWrapper } from './QuizStyles'

export const CurrentQuestion = ({score, setScore}) => {
  // const [score, setScore] = useState(0);
  const dispatch = useDispatch();
  const question = useSelector((store) => store.quiz.questions[store.quiz.currentQuestionIndex]);
  const quizState = useSelector((store) => store.quiz.quizOver);
 
  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>
  }

  const onAnswerSubmit = (questionId, answerIndex) => {
    dispatch(quiz.actions.submitAnswer({ questionId, answerIndex }));
    if (question.correctAnswerIndex === answerIndex) {
       setScore(score + 1)
      setTimeout(() => dispatch(quiz.actions.goToNextQuestion()), 800);
    } else {
      setTimeout(() => dispatch(quiz.actions.goToNextQuestion()), 800);
    }
  }

  if (quizState === false) {
    return (
        <CurrentQuizWrapper>
          <p>{question.questionText}</p>
          <div>
            {question.options.map((option, index) => {
              return (
                <AnswerButton
                  className={index === question.correctAnswerIndex ? 'correctBtn' : 'wrongBtn'}
                  key={option}
                  type="button"
                  onClick={() => onAnswerSubmit(question.id, index)}>
                  {option}
                </AnswerButton>
              )
            })}
          </div>
        </CurrentQuizWrapper>
    )
  } 
  else {
      return (
        console.log(score),
       <Summary score={score} setScore={setScore}/> 
      )
    } 
}



// if (quizState === false) {
//   return (
//       <>
//         <h1>{question.questionText}</h1>
//         <div>
//           {question.options.map((option, index) => {
//             return (
//               <button
//                 className={index === question.correctAnswerIndex ? 'correctBtn' : 'wrongBtn'}
//                 key={option}
//                 type="button"
//                 onClick={() => onAnswerSubmit(question.id, index)}>
//                 {option}
//               </button>
//             )
//           })}
//         </div>
//       </>
//   )
// } else {
//   return (
//      <Summary score={score} /> 
//   )
// } 
// }  