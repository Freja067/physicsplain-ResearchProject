export function logMessage(level, message) {
    fetch('/log', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ level, message }),
    })
    .then(response => {
        if (!response.ok) {
            console.error('Failed to log message:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error sending log message:', error);
    });
}