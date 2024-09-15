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

// Ruta para generar pregunta
app.post('/generate-question', async (req, res) => {
  const { age, occupation, educationLevel, preferences } = req.body;

  const prompt = `Genera una pregunta de educación financiera para un usuario con los siguientes datos: 
  Edad: ${age}, 
  Ocupación: ${occupation}, 
  Nivel de educación financiera: ${educationLevel}, 
  Preferencias digitales: ${preferences}.
  La pregunta y las respuestas deben estar en el siguiente formato JSON (Nota, solo es un ejemplo de formato! Tu crea las preguntas y respuestas y cambia el orden, no tiene que ser siempre b la respuesta correcta.):

  {
      "pregunta": "¿Cuál es una estrategia recomendada para ahorrar dinero mientras eres estudiante?",
      "respuestas": {
          "a": "Invertir en acciones de alto riesgo",
          "b": "Abrir una cuenta de ahorros y establecer un presupuesto mensual",
          "c": "Tomar préstamos constantemente para mantener un estilo de vida lujoso",
          "d": "Ignorar completamente tus finanzas y gastar sin control"
      },
      "respuesta_correcta": "b"
  }

  Asegúrate de que la salida esté exactamente en este formato JSON, solo JSON, sin explicaciones adicionales.`;

  try {
    const response = await openAIClient.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200,
      temperature: 0.7,
    });

    const questionData = response.data.choices[0].message.content;
    console.log('Respuesta de OpenAI:', questionData);

    try {
      const parsedData = JSON.parse(questionData.trim());
      res.json(parsedData);  // Envía la respuesta JSON al cliente
    } catch (jsonError) {
      console.error('Error al analizar JSON:', jsonError.message);
      return res.status(500).json({ error: 'La respuesta de OpenAI no está en formato JSON válido.' });
    }

  } catch (error) {
    console.error('Error en la solicitud a OpenAI:', error.message);
    return res.status(500).json({ error: 'Error generando la pregunta con OpenAI' });
  }
}); 

// Ruta para manejar el perfil de usuario
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

// Ruta para obtener el perfil de usuario
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

// Ruta para actualizar los puntos del usuario
app.post('/api/user-points', async (req, res) => {
    const { auth0UserId, points } = req.body;
  
    try {
      const userResult = await pool.query('SELECT points FROM user_profile WHERE auth0_user_id = $1', [auth0UserId]);
  
      if (userResult.rows.length > 0) {
        // Si el usuario existe, sumamos los puntos
        const currentPoints = userResult.rows[0].points;
        const newPoints = currentPoints + points;
  
        await pool.query(
          'UPDATE user_profile SET points = $1 WHERE auth0_user_id = $2',
          [newPoints, auth0UserId]
        );
        res.json({ message: `Puntos actualizados. Puntos totales: ${newPoints}` });
      } else {
        // Si el usuario no existe, lo creamos con los puntos iniciales
        await pool.query(
          'INSERT INTO user_profile (auth0_user_id, points) VALUES ($1, $2)',
          [auth0UserId, points]
        );
        res.json({ message: 'Usuario creado y puntos establecidos' });
      }
    } catch (error) {
      console.error('Error al manejar los puntos del usuario:', error);
      res.status(500).send('Error al manejar los puntos del usuario');
    }
  });  
  

// Ruta para obtener los puntos del usuario
app.get('/api/user-points/:auth0UserId', async (req, res) => {
  const { auth0UserId } = req.params;

  try {
    const result = await pool.query('SELECT points FROM user_profile WHERE auth0_user_id = $1', [auth0UserId]);

    if (result.rows.length > 0) {
      res.json({ points: result.rows[0].points });
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener los puntos del usuario:', error);
    res.status(500).send('Error al obtener los puntos del usuario');
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend escuchando en el puerto ${PORT}`);
});
