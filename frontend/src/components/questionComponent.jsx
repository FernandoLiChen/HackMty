import React, { useState, useEffect } from 'react';

const QuestionComponent = () => {
  const [questionData, setQuestionData] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      const response = await fetch('http://localhost:3001/generate-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          age: 25,
          occupation: 'Estudiante',
          educationLevel: 'Básico',
          preferences: 'Uso de banca digital'
        }),
      });

      const data = await response.json();
      setQuestionData(data);
    };

    fetchQuestion();
  }, []);

  if (!questionData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{questionData.question}</h2>
      <ul>
        <li>{questionData.correct_answer}</li>
        {questionData.incorrect_answers.map((answer, index) => (
          <li key={index}>{answer}</li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionComponent;
