const express = require('express');
const router = express.Router();
const Movie = require('./movie');

// Create a new movie
router.post('/movies', async (req, res) => {
    try {
        const { title, synopsis } = req.body;
        const movie = new Movie({ title, synopsis });
        await movie.save();
        res.status(201).json(movie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all movies
router.get('/movies', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific movie
router.get('/movies/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Route pour mettre à jour un film
router.put('/movies/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Film not found' });
        }

        movie.title = req.body.title;
        movie.synopsis = req.body.synopsis;
        movie.release = req.body.release;

        const updatedMovie = await movie.save();
        res.json(updatedMovie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a movie
router.patch('/movies/:id', async (req, res) => {
    try {
        const { title, synopsis } = req.body;
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        if (title) {
            movie.title = title;
        }
        if (synopsis) {
            movie.synopsis = synopsis;
        }
        await movie.save();
        res.json(movie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a movie
router.delete('/movies/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        await movie.remove();
        res.json({ message: 'Movie deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
