const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config(); // Carga variables de entorno desde el archivo .env

// Configurar OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Asegúrate de tener la variable en .env
});
const openAIClient = new OpenAIApi(configuration);

const app = express();
app.use(express.json());
app.use(cors());

app.post('/generate-question', async (req, res) => {
    const { age, occupation, educationLevel, preferences } = req.body;
  
    const prompt = `Genera una pregunta de educación financiera para un usuario con los siguientes datos: 
    Edad: ${age}, 
    Ocupación: ${occupation}, 
    Nivel de educación financiera: ${educationLevel}, 
    Preferencias digitales: ${preferences}.
    Proporciona 4 respuestas posibles, 1 correcta y 3 incorrectas. La salida debe estar estrictamente en formato JSON, solo JSON, sin explicaciones adicionales.`;

  
    try {
      const response = await openAIClient.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 200,
        temperature: 0.7,
      });
  
      try {
        const questionData = response.data.choices[0].message.content;
      
        console.log('Respuesta de OpenAI:', questionData);
      
        // Intenta hacer JSON.parse()
        const parsedData = JSON.parse(questionData.trim());
        res.json(parsedData);
      } catch (jsonError) {
        console.error('Error al analizar JSON:', jsonError.message);
        res.status(500).json({ error: 'La respuesta de OpenAI no está en formato JSON válido.' });
      }
  
      // Imprime la respuesta de OpenAI antes de intentar hacer JSON.parse()
      console.log('Respuesta de OpenAI:', questionData);
  
      res.json(JSON.parse(questionData.trim())); // Aquí es donde ocurre el error
    } catch (error) {
      console.error('Error en la solicitud a OpenAI:', error.message);
      res.status(500).json({ error: 'Error generando la pregunta con OpenAI' });
    }
  });
  

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend escuchando en el puerto ${PORT}`);
});
