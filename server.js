const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const Movie = require('./movie');
const routes = require('./routes');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/moviesDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log('Connected to MongoDB');

    // Read movies from JSON file and insert into database if not already present
    try {
        const moviesData = fs.readFileSync('movies.json');
        const movies = JSON.parse(moviesData);

        for (const movie of movies) {
            const existingMovie = await Movie.findOne({ title: movie.title });
            if (!existingMovie) {
                const newMovie = new Movie({
                    title: movie.title,
                    release: movie.release
                });
                await newMovie.save();
                console.log(`Added ${movie.title} to the database`);
            }
        }
    } catch (error) {
        console.error('Error importing movies:', error);
    }
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
});

// Middleware
app.use(express.json());

// Routes
app.use('/api', routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
