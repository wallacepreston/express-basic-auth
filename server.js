
import express from 'express';

// Create a new instance of Express.js
const app = express();

// Define Basic Authentication middleware
const basicAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    res.status(401).send('Unauthorized');
    return;
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');

  if (username !== 'username' || password !== 'password') {
    res.status(401).send('Unauthorized');
    return;
  }

  next();
};

app.get('/secret-base', basicAuth, (req, res) => {
  res.send('Welcome to the secret base!');
});

// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log('Server listening at http://localhost:3000');
});