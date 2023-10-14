import { createSlice } from '@reduxjs/toolkit'

const questions = [
  { 
    id: 1, questionText: 'did you slept more than 6 hours tonight??',  
    options: ['Yes', 'No'], 
    correctAnswerIndex: 0, 
    stringAnswer: 'Yes',
  },
  { 
    id: 2,
    questionText: 'Do you feel motivated today?',
    options:['No ', 'Yes'],
    correctAnswerIndex: 1,
    stringAnswer: 'Yes' 
  },
  { 
    id: 3,
    questionText: 'Are you happy today?',
    options: ['No', 'Yes'],
    correctAnswerIndex: 1,
    stringAnswer: 'Yes' }
]

const initialState = {
  questions,
  answers: [],
  currentQuestionIndex: 0,
  quizOver: false,
  correctAnswer: null
}

export const quiz = createSlice({
  name: 'quiz',
  initialState,
  reducers: {

    submitAnswer: (store, action) => {
      const { questionId, answerIndex } = action.payload
      const question = store.questions.find((question) => question.id === questionId)
        store.answers.push({
        questionId,
        answerIndex,
        question,
        answer: question.options[answerIndex],
        isCorrect: question.correctAnswerIndex === answerIndex
      })
    },
    
    goToNextQuestion: (store) => {
      store.correctAnswer = null
      if (store.currentQuestionIndex + 1 === store.questions.length) {
        store.quizOver = true
      } else {
        store.currentQuestionIndex += 1
      }
     },

   
    restart: () => {
      console.log("Restarting quiz...");
      return initialState;
    }
  }
})

 /**
     * Use this action when a user selects an answer to the question.
     * The answer will be stored in the `quiz.answers` state with the
     * following values:
     *
     *    questionId  - The id of the question being answered.
     *    answerIndex - The index of the selected answer from the question's options.
     *    question    - A copy of the entire question object, to make it easier to show
     *                  details about the question in your UI.
     *    answer      - The answer string.
     *    isCorrect   - true/false if the answer was the one which the question says is correct.
     *
     * When dispatching this action, you should pass an object as the payload with `questionId`
     * and `answerIndex` keys. See the readme for more details.
     */


/**
     * Use this action to progress the quiz to the next question. If there's
     * no more questions (the user was on the final question), set `quizOver`
     * to `true`.
     *
     * This action does not require a payload.
     */

 /**
     * This action shows if your answer is correct or not and display which button is actually correct.
     */