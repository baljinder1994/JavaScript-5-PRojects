const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

server.on('connection', ws => {
    console.log('New connection established');

    ws.on('message', message => {
        console.log('Received message from client:', message);

        // Broadcast the message to all clients
        server.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message); // Ensure you're sending text
            }
        });
    });

    ws.on('close', () => {
        console.log('Connection closed');
    });
});
