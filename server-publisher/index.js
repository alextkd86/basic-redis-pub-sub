import express, { urlencoded, json } from 'express';
import { createClient } from 'redis';
import { v4 as uuidv4 } from 'uuid'; // Renamed v4 to uuidv4 for clarity

const app = express();
const PORT = 3000;
const URL_REDIS_CONN = 'redis://localhost:6379';
const NAME_CHANNEL = 'channel1';

app.use(urlencoded({ extended: false }));
app.use(json());

// Create a Redis client
const redisClient = createClient({ url: URL_REDIS_CONN });

// Handle Redis connection errors
redisClient.on('error', err => console.error('Redis Client Error', err));

// Endpoint POST --> localhost:3000/testRedis
app.post('/testRedis', (req, res) => {
  try {
    // Check if the 'message' property exists in the request body
    if (!req.body?.message) {
      return res.status(400).json({
        error: 400,
        detail: 'The message is mandatory',
      });
    }

    // Generate a message as an object with a unique ID, message, and date
    const message = {
      id: uuidv4(), // Use renamed uuidv4 function
      message: req.body.message,
      date: new Intl.DateTimeFormat('es-ES').format(new Date()),
    };

    // Publish the message to the specified Redis channel
    redisClient.publish(NAME_CHANNEL, JSON.stringify(message));
    console.log(`Published an Event using Redis: ${req.body.message}`);

    return res.json({ detail: 'Published an Event using Redis successfully' });
  } catch (error) {
    return res.status(500).json({ detail: error.message });
  }
});

// Connect to Redis and start the Express server
redisClient.connect().then(() => {
  console.log('Redis connected');
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});
