import { useState, useEffect } from "react";
import yourImage from "../assets/images/logo1.png"; // Asegúrate de tener el logo en el camino correcto
import axios from "axios"; // Necesitamos axios para hacer la solicitud al backend
import { useAuth0 } from "@auth0/auth0-react";

const answerColors = [
  "bg-red-800", "bg-red-800", "bg-red-800", "bg-red-800"
];

// Función para barajar respuestas
const shuffleArray = (array) => {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
};

const Questions = () => {
  const { user, isAuthenticated, isLoading } = useAuth0(); // Asegúrate de que user esté cargado
  const [isVisible, setIsVisible] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true); // Estado para controlar la carga del perfil

  // Datos del usuario obtenidos desde la base de datos
  const [userProfile, setUserProfile] = useState({
    age: null,
    occupation: null,
    educationLevel: null,
    preferences: null,
  });

  // Obtener el perfil del usuario desde la base de datos
  const fetchUserProfile = async () => {
    if (!user || !user.sub) {
      console.error("El objeto user no está disponible.");
      return;
    }
    try {
      const response = await axios.get(`http://localhost:3001/api/user-profile/${user.sub}`);
      if (response.data) {
        setUserProfile({
          age: response.data.age,
          occupation: response.data.occupation,
          educationLevel: response.data.education_level, // Asegúrate de que los nombres de las columnas coincidan
          preferences: response.data.preferences,
        });
      }
      setLoadingProfile(false); // Perfil cargado correctamente
    } catch (error) {
      console.error("Error al obtener el perfil del usuario:", error);
      setLoadingProfile(false); // Error al cargar el perfil
    }
  };

  // Función para obtener una nueva pregunta del backend
  const fetchNewQuestion = async () => {
    const { age, occupation, educationLevel, preferences } = userProfile;

    // Verificar si faltan datos del perfil antes de intentar generar la pregunta
    if (!age || !occupation || !educationLevel || !preferences) {
      console.error("Faltan datos del perfil de usuario para generar preguntas.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/generate-question', {
        age,
        occupation,
        educationLevel,
        preferences
      });

      const newQuestion = response.data;
      const formattedQuestion = {
        question: newQuestion.pregunta,
        answers: [
          { text: newQuestion.respuestas.a, isCorrect: newQuestion.respuesta_correcta === "a" },
          { text: newQuestion.respuestas.b, isCorrect: newQuestion.respuesta_correcta === "b" },
          { text: newQuestion.respuestas.c, isCorrect: newQuestion.respuesta_correcta === "c" },
          { text: newQuestion.respuestas.d, isCorrect: newQuestion.respuesta_correcta === "d" }
        ]
      };

      // Añadir la pregunta a la lista de preguntas
      setQuestions(prevQuestions => [...prevQuestions, formattedQuestion]);

    } catch (error) {
      console.error("Error al obtener la pregunta:", error);
    }
  };

  // Obtener el perfil del usuario al montar el componente
  useEffect(() => {
    if (isAuthenticated && !isLoading && user) {
      fetchUserProfile(); // Obtener los datos del usuario cuando user esté cargado
    }
  }, [isAuthenticated, isLoading, user]);

  // Obtener una pregunta inicial cuando el quiz es visible
  const toggleTextBox = () => {
    setIsVisible(!isVisible);
    if (!isVisible) {
      // Resetear estado al abrir el quiz
      setCurrentQuestionIndex(0);
      setSelectedAnswerIndex(null);
      setCorrectAnswersCount(0);
      setQuizCompleted(false);
      setQuestions([]); // Limpiar preguntas previas

      fetchNewQuestion(); // Obtener la primera pregunta
    }
  };

  const handleAnswerClick = (index, isCorrect) => {
    setSelectedAnswerIndex(index);
    if (isCorrect) {
      setCorrectAnswersCount(correctAnswersCount + 1);
    }

    if (currentQuestionIndex < 4) {
      // Generar la siguiente pregunta solo si no es la última
      setTimeout(() => {
        fetchNewQuestion(); // Obtener una nueva pregunta
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswerIndex(null);
      }, 1000);
    } else {
      // Termina el quiz cuando se llega a la última pregunta
      setTimeout(() => {
        setQuizCompleted(true);
      }, 1000);
    }
  };

  const handleFinishClick = async () => {
    setIsVisible(false); // Cierra el quiz
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setQuizCompleted(false);
  
    // Enviar puntos al backend
    try {
      await axios.post('http://localhost:3001/api/user-points', {
        auth0UserId: user.sub, // Aquí puedes obtener el auth0UserId dinámicamente
        points: correctAnswersCount  // Enviar la cantidad de respuestas correctas como puntos
      });
      console.log("Puntos enviados al backend con éxito");
    } catch (error) {
      console.error("Error al enviar los puntos:", error);
    }
  };
  

  const handlePlayAgain = () => {
    // Reiniciar el quiz sin cerrar el modal
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setCorrectAnswersCount(0);
    setQuizCompleted(false);
    setQuestions([]); // Limpiar preguntas previas
    fetchNewQuestion(); // Obtener una nueva pregunta al empezar de nuevo
  };

  return (
    <div className="">
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTextBox}
          className="p-4 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
        >
          Open Quiz
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 w-2/3 lg:w-1/3 h-full bg-white border-gray-300 shadow-lg transition-transform transform ${
          isVisible ? "-translate-x-0" : "-translate-x-full"
        } duration-500 ease-in-out`}
      >
        <div className="relative flex flex-col justify-center md:items-center h-full p-6">
          <img
            src={yourImage}
            alt="Decorative"
            className="absolute top-4 left-1/2 transform -translate-x-1/2 p-8"
          />

          {quizCompleted ? (
            // Muestra el mensaje de felicitación cuando el quiz está completado
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-lg md:text-2xl font-bold mb-4 mt-6">¡Buen trabajo!</h1>
              <p>Has respondido {correctAnswersCount} de 5 preguntas correctamente.</p>
              <div className="mt-6 space-x-4">
                <button
                  onClick={handlePlayAgain}
                  className="p-4 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all"
                >
                  Volver a jugar
                </button>
                <button
                  onClick={handleFinishClick}
                  className="p-4 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
                >
                  Salir
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Contador de preguntas */}
              <div className="absolute top-4 right-8">
                <p className="text-sm text-gray-500">
                  Pregunta {currentQuestionIndex + 1} de 5
                </p>
              </div>

              <h1 className="text-lg md:text-2xl font-bold mb-4 mt-6 flex justify-center">
                {questions[currentQuestionIndex]?.question || "Loading..."}
              </h1>

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
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default Questions;
