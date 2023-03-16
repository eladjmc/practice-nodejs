const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

// Use body-parser middleware to parse request bodies
app.use(bodyParser.json());

// Define routes for CRUD operations
app.get('/movies', (req, res) => {
  // Read all movies from JSON file
  const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf8'));
  res.json(movies);
});

app.get('/movies/:id', (req, res) => {
  // Read a single movie from JSON file by ID
  const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf8'));
  const movie = movies.find(movie => movie.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send('Movie not found');
  res.json(movie);
});

app.post('/movies', (req, res) => {
  // Create a new movie and save to JSON file
  const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf8'));
  const newMovie = req.body;
  newMovie.id = movies.length + 1;
  movies.push(newMovie);
  fs.writeFileSync('./movies.json', JSON.stringify(movies));
  res.json(newMovie);
});

app.put('/movies/:id', (req, res) => {
  // Update an existing movie in JSON file by ID
  const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf8'));
  const movieIndex = movies.findIndex(movie => movie.id === parseInt(req.params.id));
  if (movieIndex === -1) return res.status(404).send('Movie not found');
  const updatedMovie = Object.assign(movies[movieIndex], req.body);
  fs.writeFileSync('./movies.json', JSON.stringify(movies));
  res.json(updatedMovie);
});

app.delete('/movies/:id', (req, res) => {
  // Delete an existing movie from JSON file by ID
  const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf8'));
  const movieIndex = movies.findIndex(movie => movie.id === parseInt(req.params.id));
  if (movieIndex === -1) return res.status(404).send('Movie not found');
  movies.splice(movieIndex, 1);
  fs.writeFileSync('./movies.json', JSON.stringify(movies));
  res.sendStatus(204);
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});