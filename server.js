// Import express
const express = require('express');
const cors = require('cors');


// Create a new express application
const app = express();

// Use cors middleware
app.use(cors());


// Middleware to parse JSON bodies
app.use(express.json());

// Handle POST requests to /submit
app.post('/submit', (req, res) => {
    // Extract characters and attributes from req.body
    const { usefulCharacters, uselessCharacters, usefulAttributes, uselessAttributes } = req.body;

    // Shuffle and pair up characters and attributes
    const pairs = pairCharacters(usefulCharacters.concat(uselessCharacters), usefulAttributes.concat(uselessAttributes));

    // Send response back
    res.json(pairs);
});

// Function to pair characters and attributes
function pairCharacters(characters, attributes) {
    // Shuffle characters and attributes
    const shuffledCharacters = shuffleArray(characters);
    const shuffledAttributes = shuffleArray(attributes);

    // Pair them up
    const pairs = shuffledCharacters.map((character, index) => {
        return {
            character: character,
            attribute: shuffledAttributes[index]
        };
    });

    return pairs;
}

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
