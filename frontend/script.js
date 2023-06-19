window.onload = () => {
    const inputGroups = ["usefulCharacters", "uselessCharacters", "usefulAttributes", "uselessAttributes"];

    inputGroups.forEach((group) => {
        for (let i = 0; i < 5; i++) {
            const inputField = document.createElement("input");
            inputField.type = "text";
            inputField.id = `${group}${i}`;
            document.getElementById(group).appendChild(inputField);
        }
    });

    document.getElementById('characterForm').addEventListener('submit', async (event) => {
        event.preventDefault();

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

        await fetch('http://localhost:3000/submit', {
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

        for (let i = 0; i < 5; i++) {
            document.getElementById('usefulCharacter' + i).value = '';
            document.getElementById('uselessCharacter' + i).value = '';
            document.getElementById('usefulAttribute' + i).value = '';
            document.getElementById('uselessAttribute' + i).value = '';
        }
    });

    document.getElementById('submitAll').addEventListener('click', async (event) => {
        event.preventDefault();

        const response = await fetch('http://localhost:3000/submitAll', {
            method: 'POST',
        });

        const pairs = await response.json();
        const characterDisplay = document.getElementById('characterDisplay');
        characterDisplay.innerHTML = '';

        pairs.forEach(pair => {
            characterDisplay.innerHTML += `<p>${pair.character}: ${pair.attribute}</p>`;
        });
    });
};
