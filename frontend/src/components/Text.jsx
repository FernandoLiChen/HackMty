import { useState } from "react";
import yourImage from "../assets/images/logo1.png"; // Replace with the correct path to your PNG image

const questions = [
  "Question 1: What is your name?",
  "Question 2: What is your age?",
  "Question 3: What is your favorite color?",
  // Add more questions as needed
];

const Text = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");

  const toggleTextBox = () => {
    setIsVisible(!isVisible);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default Enter key behavior (like adding a new line)
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setAnswer(""); // Clear the answer field for the next question
      } else {
        // Optionally handle end of questions (e.g., submit answers)
        console.log("All questions answered:", answer);
        setIsVisible(false); // Hide the text box when done
      }
    }
  };

  return (
    <div className="">
      {/* Button in the top right corner */}
      <div className="absolute top-20 right-4">
        <button
          onClick={toggleTextBox}
          className="p-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all"
        >
          Open Text Box
        </button>
      </div>

      {/* Text box that pops up from below */}
      <div
        className={`fixed top-0 left-0 w-1/3 h-full bg-white border-gray-300 shadow-lg transition-transform transform ${
          isVisible ? "-translate-x-0" : "-translate-x-full"
        } duration-500 ease-in-out`}
      >
        <div className="relative flex flex-col justify-center items-center h-full p-6">
          {/* PNG image on top of the text box */}
          <img
            src={yourImage}
            alt="Decorative"
            className="absolute top-4 left-1/2 transform -translate-x-1/2 p-8"
          />

          <h1 className="text-2xl font-bold mb-4 mt-20">{questions[currentQuestionIndex]}</h1>

          {/* Text area */}
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your answer here..."
            className="w-3/4 h-1/2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Text;
