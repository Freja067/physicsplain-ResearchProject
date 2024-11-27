export function sendLogC(logData, message) {
  // Combine the log data with the message
  const logMessage = {
    ...logData,      // Spread the log data (body1Id, body2Id, etc.)
    msg: message,    // Add the message to the msg field
  };

  console.log('Sending log:', JSON.stringify(logMessage)); // Log the data being sent
  
  fetch('http://localhost:3000/log/collision', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(logMessage),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then((data) => {
      console.log('Log successfully sent:', data);
    })
    .catch((error) => {
      console.error('Error sending log:', error);
    });
}

export function sendLogI(logData) {
  // Combine the log data with the message
  const logMessage = {
    ...logData      // Spread the log data (body1Id, body2Id, etc.)
  };

  console.log('Sending log:', JSON.stringify(logMessage)); // Log the data being sent
  
  fetch('http://localhost:3000/log/init', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(logMessage),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then((data) => {
      console.log('Log successfully sent:', data);
    })
    .catch((error) => {
      console.error('Error sending log:', error);
    });
}
