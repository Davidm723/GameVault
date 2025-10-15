const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    system: {
        type: String,
        enum: ['3ds', 'atari 2600', 'dreamcast', 'ds', 'game boy', 'game boy advance', 'game boy color', 'gamecube', 'gamegear', 'genesis', 'neo geo', 'nes', 'nintendo 64', 'nintendo switch', 'nintendo switch 2', 'pc', 'playstation', 'playstation 2', 'playstation 3', 'playstation 4', 'playstation 5', 'playstation vita', 'psp', 'saturn', 'sega 32x', 'sega cd', 'sega master system', 'super nintendo', 'virtual boy', 'wii', 'wii u', 'xbox', 'xbox 360', 'xbox one', 'xbox series x'],
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