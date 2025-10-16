const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    system: {
        type: String,
        enum: ['3DS', 'Atari 2600', 'Dreamcast', 'DS', 'Game Boy', 'Game Boy Advance', 'Game Boy Color', 'GameCube', 'GameGear', 'Genesis', 'Neo Geo', 'NES', 'Nintendo 64', 'Nintendo Switch', 'Nintendo Switch 2', 'PC', 'PlayStation', 'PlayStation 2', 'PlayStation 3', 'PlayStation 4', 'PlayStation 5', 'PlayStation Vita', 'PSP', 'Saturn', 'Sega 32X', 'Sega CD', 'Sega Master System', 'Super Nintendo', 'Virtual Boy', 'Wii', 'Wii U', 'Xbox', 'Xbox 360', 'Xbox One', 'Xbox Series X'],
        required: true,
    },
    completeInBox: {
        type: Boolean,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    notes: {
        type: String,
    },
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    games: [gameSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;