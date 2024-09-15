import { useState, useEffect } from "react";
import yourImage from "../assets/images/logo1.png"; // Replace with the correct path to your PNG image

const initialQuestions = [
  {
    question: "Question: What is the primary purpose of a budget?",
    answers: [
      { text: "To increase debt", isCorrect: false },
      { text: "To track and plan financial resources", isCorrect: true },
      { text: "To avoid paying taxes", isCorrect: false },
      { text: "To spend more on luxuries", isCorrect: false }
    ]
  },
  {
    question: "Question: What is an emergency fund?",
    answers: [
      { text: "Money set aside for unexpected expenses", isCorrect: true },
      { text: "A fund for vacations", isCorrect: false },
      { text: "A loan from a bank", isCorrect: false },
      { text: "Investment in stocks", isCorrect: false }
    ]
  },
  {
    question: "Question: What does 'compound interest' mean?",
    answers: [
      { text: "Interest on the initial principal only", isCorrect: false },
      { text: "Interest on the principal and accumulated interest", isCorrect: true },
      { text: "Interest charged on overdue bills", isCorrect: false },
      { text: "Interest that is fixed and unchanging", isCorrect: false }
    ]
  },
  {
    question: "Question: What is a 401(k) plan?",
    answers: [
      { text: "A retirement savings plan with tax benefits", isCorrect: true },
      { text: "A type of insurance policy", isCorrect: false },
      { text: "A short-term loan", isCorrect: false },
      { text: "A credit card", isCorrect: false }
    ]
  },
  {
    question: "Question: What is diversification in investing?",
    answers: [
      { text: "Spreading investments across various assets", isCorrect: true },
      { text: "Investing all money in one stock", isCorrect: false },
      { text: "Holding cash instead of investments", isCorrect: false },
      { text: "Investing in only one type of asset", isCorrect: false }
    ]
  }
  // Add more questions as needed
];

const answerColors = [
  "bg-yellow-500", "bg-blue-600", "bg-slate-400", "bg-purple-600"
];

const shuffleArray = (array) => {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
};

const Questions = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  useEffect(() => {
    // Shuffle questions and answers
    const shuffledQuestions = shuffleArray(initialQuestions.map(q => ({
      ...q,
      answers: shuffleArray([...q.answers])
    })));
    setQuestions(shuffledQuestions);
  }, []);

  const toggleTextBox = () => {
    setIsVisible(!isVisible);
    if (!isVisible) {
      // Reset state when opening the quiz
      setQuestions(shuffleArray(initialQuestions.map(q => ({
        ...q,
        answers: shuffleArray([...q.answers])
      }))));
      setCurrentQuestionIndex(0);
      setSelectedAnswerIndex(null);
      setCorrectAnswersCount(0);
    }
  };

  const handleAnswerClick = (index, isCorrect) => {
    setSelectedAnswerIndex(index);
    if (isCorrect) {
      setCorrectAnswersCount(correctAnswersCount + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswerIndex(null);
      }, 1000); // Wait 1 second before going to the next question
    }
  };

  const handleFinishClick = () => {
    console.log("Quiz complete. Your score:", correctAnswersCount);
    setIsVisible(false); // Close the quiz window
    // Optionally, reset state if the quiz is reopened
    setQuestions(shuffleArray(initialQuestions.map(q => ({
      ...q,
      answers: shuffleArray([...q.answers])
    }))));
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setCorrectAnswersCount(0);
  };

  return (
    <div className="">
      {/* Button in the top right corner */}
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTextBox}
          className="p-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all"
        >
          Open Quiz
        </button>
      </div>

      {/* Quiz box that pops up from below */}
      <div
        className={`fixed top-0 left-0 w-2/3 lg:w-1/3 h-full bg-white border-gray-300 shadow-lg transition-transform transform ${
          isVisible ? "-translate-x-0" : "-translate-x-full"
        } duration-500 ease-in-out`}
      >
        <div className="relative flex flex-col justify-center md:items-center h-full p-6">
          {/* PNG image on top of the quiz box */}
          <img
            src={yourImage}
            alt="Decorative"
            className="absolute top-4 left-1/2 transform -translate-x-1/2 p-8"
          />

          <h1 className="text-lg md:text-2xl font-bold mb-4 mt-6 flex justify-center">{questions[currentQuestionIndex]?.question}</h1>

          <div className="w-3/4 flex flex-col space-y-2">
            {questions[currentQuestionIndex]?.answers.map((answer, index) => {
              const buttonColor = answerColors[index % answerColors.length];
              const buttonClasses = `p-4 rounded-md text-white ${selectedAnswerIndex === index ? (answer.isCorrect ? "bg-green-500" : "bg-red-500") : buttonColor}`;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index, answer.isCorrect)}
                  className={buttonClasses}
                  disabled={selectedAnswerIndex !== null}
                >
                  {answer.text}
                </button>
              );
            })}
          </div>

          {/* Finish button at the end */}
          {currentQuestionIndex === questions.length - 1 && (
            <button
              onClick={handleFinishClick}
              className="absolute bottom-4 right-4 p-4 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all"
            >
              Finish
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Questions;
