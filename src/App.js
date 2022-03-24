import React from 'react'
import { useGlobalContext } from './context'

import SetupForm from './SetupForm'
import Loading from './Loading'
import Modal from './Modal'
function App() {
  const {waiting, loading, questions, index, correct,nextQuestion,checkAnswer} = useGlobalContext()
  if(waiting){
    return <SetupForm/>
  }
  if(loading) {
    return <Loading />
  }
 const {question, incorrect_answers, correct_answer} = questions[index]
//console.log(questions[0])
//  const answers = [...incorrect_answers, correct_answer]

//to setup answer at random position
let answers = [...incorrect_answers]
//to get random no. between 0 and 4.
const tempIndex = Math.floor(Math.random() * 4)
if(tempIndex === 3){
  answers.push(correct_answer)
}
else {
  answers.push(answers[tempIndex])
  answers[tempIndex] = correct_answer
}

  return (
    <main>
      <Modal />
      <section className='quiz'>
        <p className='correct-answers'>
          correct answers : {correct}/{index}
        </p>
        <article className='container'>
          {/* Since the data contained in question is not in string format but in html format so, we need to use this attribute in order to fetch the question in correct format. */}
          {/* We shouldn't use this attribute randomly or where we take user input as the user can add malware to the data. */}
          <h2 dangerouslySetInnerHTML={{__html: question}}/>
          <div className='btn-container'>
            {answers.map((answer, index) => {
              return (
                <button key = {index} className = 'answer-btn' 
                onClick={()=> checkAnswer(correct_answer === answer)}
                dangerouslySetInnerHTML={{__html: answer}} />
              )
            })}
          </div>
        </article>
        <button className='next-question' onClick={nextQuestion}>
          next question
        </button>
      </section>
    </main>
  );
}

export default App
