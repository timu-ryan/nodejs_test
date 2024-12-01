const mosca = require('mosca');
const express = require('express');
const path = require('path');

const app = express();
const httpPort = 3000;

// MQTT settings
const mqttSettings = {
  port: 1883, // MQTT protocol
  http: {
    port: 9001, // WebSocket protocol
    bundle: true,
    static: './'
  }
};

// MQTT Broker
const mqttServer = new mosca.Server(mqttSettings);

mqttServer.on('ready', () => {
  console.log('MQTT server is running...');
});

mqttServer.on('clientConnected', (client) => {
  console.log('Client connected:', client.id);
});

mqttServer.on('published', (packet, client) => {
  console.log('Message received:', packet.payload.toString());
});

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start HTTP server
app.listen(httpPort, () => {
  console.log(`HTTP server running on http://90.156.157.236:${httpPort}`);
});
