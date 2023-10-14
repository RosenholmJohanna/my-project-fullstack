import React, { useEffect, useState} from "react";
import { CurrentQuestion } from "../components/QUIZ/CurrentQuestion";
import { Summary } from "../components/QUIZ/Summary";

const QuizPage = () => {
   const [score, setScore] = useState(0);
  
  
  return (
<> 
 <CurrentQuestion score={score} setScore={setScore} /> 
 
 {/* <Summary score={score} setScore={setScore} />  */}
</>

)
} 

// console.log(score)
export default QuizPage; 

// update redux score, so dont need to fetch
//create start wrapper to show before quiz
