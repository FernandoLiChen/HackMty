const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config(); // Carga variables de entorno desde el archivo .env
const { Pool } = require('pg');

// Configurar OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Asegúrate de tener la variable en .env
});
const openAIClient = new OpenAIApi(configuration);

const app = express();
app.use(express.json());
app.use(cors());

// Configurar la conexión a PostgreSQL
const pool = new Pool({
    user: process.env.POSTGRES_USER, // Usuario de PostgreSQL
    host: process.env.POSTGRES_HOST, // Servidor (localhost si es local)
    database: process.env.POSTGRES_DATABASE, // Nombre de la base de datos
    password: process.env.POSTGRES_PASSWORD, // Reemplaza con tu contraseña de PostgreSQL
    port: process.env.POSTGRES_PORT, // Puerto por defecto de PostgreSQL
  });

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

  app.post('/api/user-profile', async (req, res) => {
    const { auth0UserId, age, occupation, educationLevel, preferences } = req.body;
  
    try {
      const userResult = await pool.query('SELECT * FROM user_profile WHERE auth0_user_id = $1', [auth0UserId]);
  
      if (userResult.rows.length > 0) {
        // Si el usuario ya tiene un perfil, lo actualizamos
        await pool.query(
          'UPDATE user_profile SET age = $1, occupation = $2, education_level = $3, preferences = $4 WHERE auth0_user_id = $5',
          [age, occupation, educationLevel, preferences, auth0UserId]
        );
        res.json({ message: 'Perfil actualizado' });
      } else {
        // Si el usuario no tiene perfil, lo creamos
        await pool.query(
          'INSERT INTO user_profile (auth0_user_id, age, occupation, education_level, preferences) VALUES ($1, $2, $3, $4, $5)',
          [auth0UserId, age, occupation, educationLevel, preferences]
        );
        res.json({ message: 'Perfil creado' });
      }
    } catch (error) {
      console.error('Error al manejar el perfil de usuario:', error);
      res.status(500).send('Error al manejar el perfil de usuario');
    }
  });
  
  // Obtener el perfil de un usuario
  app.get('/api/user-profile/:auth0UserId', async (req, res) => {
    const { auth0UserId } = req.params;
  
    try {
      const result = await pool.query('SELECT * FROM user_profile WHERE auth0_user_id = $1', [auth0UserId]);
  
      if (result.rows.length > 0) {
        res.json(result.rows[0]);
      } else {
        res.status(404).json({ error: 'Perfil de usuario no encontrado' });
      }
    } catch (error) {
      console.error('Error al obtener el perfil de usuario:', error);
      res.status(500).send('Error al obtener el perfil de usuario');
    }
  });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend escuchando en el puerto ${PORT}`);
});
