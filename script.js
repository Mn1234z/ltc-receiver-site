let points = 0;
const scoreElement = document.getElementById('score');
const messageElement = document.getElementById('message');
const incrementButton = document.getElementById('incrementButton');
const convertButton = document.getElementById('convertButton');

// Increase points when the button is clicked
incrementButton.addEventListener('click', () => {
    points += 1;
    scoreElement.textContent = points;
});

// Send request to the server to convert points to Litecoin
convertButton.addEventListener('click', async () => {
    if (points === 0) {
        messageElement.textContent = 'You need points to convert!';
        return;
    }

    try {
        const response = await fetch('/convert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ points: points })
        });

        const data = await response.json();
        messageElement.textContent = data.message;
        points = 0;  // Reset points after conversion
        scoreElement.textContent = points;
    } catch (error) {
        messageElement.textContent = 'Error converting points. Try again.';
    }
});