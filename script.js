// script.js

// When the form is submitted
document.getElementById('characterForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Extract data from form
    const usefulCharacters = [];
    const uselessCharacters = [];
    const usefulAttributes = [];
    const uselessAttributes = [];
    for (let i = 0; i < 5; i++) {
        usefulCharacters.push(document.getElementById('usefulCharacter' + i).value);
        uselessCharacters.push(document.getElementById('uselessCharacter' + i).value);
        usefulAttributes.push(document.getElementById('usefulAttribute' + i).value);
        uselessAttributes.push(document.getElementById('uselessAttribute' + i).value);
    }

    // Send data to server
    const response = await fetch('http://localhost:3000/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            usefulCharacters,
            uselessCharacters,
            usefulAttributes,
            uselessAttributes,
        }),
    });

    // Update characterDisplay and characterSelection with response
    const pairs = await response.json();
    const characterDisplay = document.getElementById('characterDisplay');
    const characterSelection = document.getElementById('characterSelection');
    characterDisplay.innerHTML = '';
    characterSelection.innerHTML = '';
    pairs.forEach(pair => {
        characterDisplay.innerHTML += `<p>${pair.character}: ${pair.attribute}</p>`;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = pair.character;
        checkbox.name = pair.character;
        const label = document.createElement('label');
        label.htmlFor = pair.character;
        label.appendChild(document.createTextNode(pair.character));
        characterSelection.appendChild(checkbox);
        characterSelection.appendChild(label);
        characterSelection.appendChild(document.createElement('br'));
    });
});

// When the "Submit Selection" button is clicked
document.getElementById('submitSelection').addEventListener('click', (event) => {
    event.preventDefault();

    // Extract selected characters
    const checkboxes = document.getElementById('characterSelection').getElementsByTagName('input');
    const selectedCharacters = [];
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            selectedCharacters.push(checkboxes[i].id);
        }
    }

    // Log selected characters
    console.log(selectedCharacters);
});
