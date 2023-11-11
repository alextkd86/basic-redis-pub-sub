import express from 'express';
import { createClient } from 'redis';

const app = express();
const PORT = 3001;
const URL_REDIS_CONN = 'redis://localhost:6379';
const NAME_CHANNEL = 'channel1';

// Array to store received messages
const messagesStorage = [];

// Create a Redis client
const redisClient = createClient({ url: URL_REDIS_CONN });

// Handle Redis connection errors
redisClient.on('error', err => console.error('Redis Client Error', err));

// Subscribe to the Redis channel and store incoming messages
redisClient.subscribe(NAME_CHANNEL, (message) => {
  console.log("Received an Event from Redis: " + message);
  messagesStorage.push(JSON.parse(message));
});

// Endpoint to retrieve stored messages
app.get("/messages", (req, res) => {
  try {
    return res.json({ messages: messagesStorage });
  } catch (error) {
    return res.status(500).json({ detail: error.message });
  }
});

// Connect to Redis and start the Express server
redisClient.connect().then(() => {
  console.log("Connected to Redis");
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});
