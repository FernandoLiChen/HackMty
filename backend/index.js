const express = require('express');
const { ManagementClient } = require('auth0'); // SDK para interactuar con Auth0
const { expressjwt: jwt } = require('express-jwt'); // Middleware para manejar tokens JWT

const app = express();
app.use(express.json());

// Configura el cliente de Auth0 Management
const auth0 = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN, // Reemplaza con tu dominio Auth0
  clientId: process.env.AUTH0_CLIENTID, // Reemplaza con tu clientId de Auth0
  clientSecret: process.env.AUTH0_CLIENTSECRET, // Reemplaza con tu clientSecret de Auth0
  scope: 'update:users',
});

// Middleware para verificar el token de ID
const checkJwt = jwt({
  secret: process.env.AUTH0_CLIENTSECRET, // Reemplaza con tu clientSecret
  algorithms: ['HS256'],
});

// Ruta para agregar puntos
app.post('/api/add-points', checkJwt, async (req, res) => {
  const { userId, points } = req.body;

  try {
    // Obtener el usuario desde Auth0
    const user = await auth0.getUser({ id: userId });
    const currentPoints = user.user_metadata?.points || 0;

    // Sumar los puntos nuevos
    const newPoints = currentPoints + points;

    // Actualizar los puntos en Auth0
    await auth0.updateUserMetadata({ id: userId }, { points: newPoints });

    res.status(200).send({ message: 'Puntos actualizados', newPoints });
  } catch (error) {
    console.error('Error al actualizar los puntos:', error);
    res.status(500).send('Error al actualizar los puntos');
  }
});

// Ruta para obtener los puntos del usuario
app.get('/api/get-points', checkJwt, async (req, res) => {
  try {
    const userId = req.user.sub; // Obtener el ID del usuario desde el token
    const user = await auth0.getUser({ id: userId });
    const points = user.user_metadata?.points || 0; // Obtener los puntos

    res.json({ points });
  } catch (error) {
    console.error('Error al obtener los puntos:', error);
    res.status(500).send('Error al obtener los puntos');
  }
});

app.listen(3000, () => {
  console.log('Servidor ejecutándose en el puerto 3000');
});
