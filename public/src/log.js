export function sendLog(collisionData) {
    fetch('/log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(collisionData)
    })
    .then(response => {
      if (!response.ok) {
        console.error('Failed to send log to server');
      }
    })
    .catch(error => {
      console.error('Error sending log to server:', error);
    });
  }



