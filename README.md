# basic-redis-pub-sub
A basic example using Node.js, Express.js and Redis Pub/Sub

# Express and Redis Pub/Sub Example

This is a basic example showcasing the use of Node.js with Express and Redis Pub/Sub for event-driven communication. The application provides an endpoint to publish messages to a Redis channel.

## Requirements

- Node.js > 18
- Redis Server

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/alextkd86/basic-redis-pub-sub.git
    ```

2. Install libraries:

    ```bash
    cd server-publisher && npm i
    cd server-subscriber && npm i
    ```

3. Ensure that Redis server is running at redis://localhost:6379.

    ```bash
    cd basic-redis-pub-sub && docker-compose up
    ```

## Usage
1. Start Applications:

     ```bash
    cd server-publisher && node index.js
    cd server-subscriber && node index.js
    ```
2. Access the following endpoint with a POST request to publish a message:

    ```bash
    // Emit event - Execute from the terminal
    curl --location 'http://localhost:3000/testRedis' \
    --header 'Content-Type: application/json' \
    --data '{
    "message": "Hi! I am Ale"
    }'
    ```


Response --> Publishing an Event using Redis to: Hi! I am Ale  
Simultaneously, it has emitted an event to the channel named 'channel1' and if service 2 is up and running, it listens for this event and executes the code of service 2.
