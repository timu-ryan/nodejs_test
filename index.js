const aedes = require('aedes')();
const serverFactory = require('aedes-server-factory');
const express = require('express');
const path = require('path');

const app = express();
const httpPort = 3000;
const mqttPort = 1883;
const wsPort = 9001;

// Create MQTT server
const mqttServer = serverFactory.createServer(aedes);
mqttServer.listen(mqttPort, () => {
  console.log(`MQTT broker running on port ${mqttPort}`);
});

// Create WebSocket server
const wsServer = serverFactory.createServer(aedes, { ws: true });
wsServer.listen(wsPort, () => {
  console.log(`WebSocket server running on port ${wsPort}`);
});

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the HTTP server
app.listen(httpPort, () => {
  console.log(`HTTP server running on http://localhost:${httpPort}`);
});

// Aedes event handlers
aedes.on('client', (client) => {
  console.log('Client connected:', client.id);
});

aedes.on('publish', (packet, client) => {
  if (client) {
    console.log('Message received:', packet.payload.toString());
  }
});