const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    synopsis: {
        type: String,
        required: false // Changer à false pour rendre le champ facultatif
    }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
