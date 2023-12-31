// Import express and cors
const express = require('express');
const cors = require('cors');
const path = require('path')

// Create a new express application
const app = express();

// Use cors middleware
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to serve static files
app.use(express.static(path.join(__dirname, '../frontend')));


// Store all character sheets and combinations in memory
let characterSheets = [];
let characterAttributePairs = [];

// Handle POST requests to /submit
app.post('/submit', (req, res) => {
    // Extract characters and attributes from req.body
    const { usefulCharacters, uselessCharacters, usefulAttributes, uselessAttributes } = req.body;

    // Add to characterSheets
    characterSheets.push({
        usefulCharacters,
        uselessCharacters,
        usefulAttributes,
        uselessAttributes
    });

    // Send response back
    res.json({ message: 'Character sheet submitted successfully.' });
});

// Handle POST requests to /submitAll
app.post('/submitAll', (req, res) => {
    // If characterAttributePairs is empty, generate combinations
    if (characterAttributePairs.length === 0) {
        // Combine all characters and attributes from all character sheets
        let allCharacters = [];
        let allAttributes = [];
        characterSheets.forEach(sheet => {
            allCharacters = allCharacters.concat(sheet.usefulCharacters, sheet.uselessCharacters);
            allAttributes = allAttributes.concat(sheet.usefulAttributes, sheet.uselessAttributes);
        });

        // Shuffle and pair up characters and attributes
        characterAttributePairs = pairCharacters(allCharacters, allAttributes);
    }

    // Send response back
    res.json(characterAttributePairs);
});

// Handle POST requests to /clear
app.post('/clear', (req, res) => {
    // Clear characterSheets and characterAttributePairs for next game
    characterSheets = [];
    characterAttributePairs = [];

    // Send response back
    res.json({ message: 'Character sheets and character-attribute pairs cleared successfully.' });
});

// The rest of your server.js file remains the same

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
