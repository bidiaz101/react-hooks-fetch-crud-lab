import React, { useEffect } from "react";
import QuestionItem from "./QuestionItem"

function QuestionList({ questions, setQuestions }) {
    useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(resp => resp.json())
    .then(data => setQuestions(data))
  }
  , [])

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
    .then(() => {
      const updatedQuestions = questions.filter(question => question.id !== id)
      setQuestions(updatedQuestions)
    })
  }

  function handleChange(id, correctIndex){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
        "correctIndex": parseInt(correctIndex)
      })
    })
    .then(() => setQuestions(questions))
  }

  const questionItems = questions.map(questionObj => {
    return <QuestionItem 
      question={questionObj} 
      key={questionObj.id} 
      handleDelete={handleDelete}
      handleChange={handleChange}
    />
  })

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
