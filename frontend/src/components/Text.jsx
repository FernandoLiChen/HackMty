import { useState } from "react";
import yourImage from "../assets/images/logo1.png"; // Replace with the correct path to your PNG image
import { MenuItem, FormControl, Select, InputLabel } from "@mui/material"; // Import Material-UI components
import axios from 'axios'; // Para enviar los datos al backend
import { useAuth0 } from '@auth0/auth0-react'; // Importar Auth0

const questions = [
  { id: "age", question: "¿Cuál es tu edad?", type: "dropdown", options: Array.from({ length: 100 }, (_, i) => i + 1) }, // Age options from 1 to 100
  { id: "occupation", question: "¿Cuál es tu ocupación?", type: "dropdown", options: ["Estudiante", "Empleado", "Desempleado", "Retirado"] },
  { id: "education_level", question: "¿Cuál es tu nivel de educación financiera?", type: "dropdown", options: ["Basica", "Intermedia", "Avanzada"] },
  { id: "preferences", question: "¿Qué te gustaría aprender de finanzas?", type: "dropdown", options: ["Sobre tarjetas de crédito", "Sobre como ahorrar", "Sobre cómo evitar deudas", "Sobre cómo pedir un préstamo", "Sobre inversiones"] },
];

const Text = () => {
  const { user } = useAuth0(); // Obtener el ID de usuario de Auth0
  const [isVisible, setIsVisible] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({
    age: "",
    occupation: "",
    education_level: "",
    preferences: "",
  });

  const toggleTextBox = () => {
    setIsVisible(!isVisible);
  };

  const handleNextQuestion = async () => {
    const currentQuestionId = questions[currentQuestionIndex].id;
    
    // Verificar el valor de preferences
    console.log('Valor de la respuesta:', answers[currentQuestionId]);

    try {
      // Hacer un POST al backend con cada respuesta individual
      await axios.post('http://localhost:3001/api/save-answers', {
        auth0UserId: user.sub, // Enviar el ID del usuario de Auth0
        [currentQuestionId]: answers[currentQuestionId], // Enviar la respuesta para la pregunta actual
      });
      console.log(`Respuesta guardada para ${currentQuestionId}`);

      // Si quedan más preguntas, avanzar a la siguiente
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setIsVisible(false); // Ocultar el cuadro de texto al finalizar
        console.log('Cuestionario completado');
      }
    } catch (error) {
      console.error('Error al guardar las respuestas:', error);
    }
  };

  const handleDropdownChange = (e) => {
    const { value } = e.target;
    const currentQuestionId = questions[currentQuestionIndex].id;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionId]: value,
    }));
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
        className={`fixed top-0 left-0 w-2/3 md:w-1/3 h-full bg-white border-gray-300 shadow-lg transition-transform transform ${
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

          <h1 className="text-2xl font-bold mb-4 mt-20">{questions[currentQuestionIndex].question}</h1>

          {/* Conditionally render a dropdown or textarea based on the question type */}
          {questions[currentQuestionIndex].type === "dropdown" ? (
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel>{questions[currentQuestionIndex].question}</InputLabel>
              <Select
                value={answers[questions[currentQuestionIndex].id] || ""}
                onChange={handleDropdownChange}
                label={questions[currentQuestionIndex].question}
              >
                {questions[currentQuestionIndex].options.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <textarea
              value={answers[questions[currentQuestionIndex].id]}
              onChange={handleDropdownChange}
              placeholder="Type your answer here..."
              className="w-3/4 h-1/2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
            />
          )}

          <button
            onClick={handleNextQuestion}
            className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all"
          >
            {currentQuestionIndex < questions.length - 1 ? "Next" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Text;
