# Chat Ecommerce AI

## Description

This is a chatbot that can be used to help customers with their shopping experience. It can answer questions about products, recommend products, and help with the checkout process built with chat GPT.

## Requirements
- Docker
- Docker Compose
- Chat GPT API Key
- Stripe API Key

## Setup and Installation

- Clone the repo:
 ```sh
    git clone https://github.com/Carlos0934/ai-chatbot-server.git 
```

- Setup environment variables
-  Create a .env file in the root directory from the .env.example file
- Add your own values to the environment variables.
- Ensure you have ports from 8000 to 8004 available for run the server.
- Run docker compose up to start the server
 ```sh
    docker compose up
 ```

## Usage

Go to ws://localhost:8000/ and send a json message with the following format:
```sh
    {
        "message": "Hello",
        "userId": "1234",
    }
```

Each message if was sent correctly store the message in 
the database and return a response in text format.

## Project Structure

```sh
    .
    ├── gpt-api (Chat GPT API Server Entry Point)
    │  
    ├── product-api (Simple product API built with Rust)
    │  
    ├── payment-api (API built with Deno to handle payments intents with stripe)
    │  
    ├── shopping-api (API built with ASP.NET 7 to handle shopping cart and orders stored in sqlite)


```

## Tech Stack
* Nodejs
* ASP.NET 7
* Rust
* Deno
* Docker
* Sqlite
* Stripe

## Bot Configuration
You can see the bot configuration in the file /gpt-api/bot.txt.

## License
Distributed under the MIT License. See `LICENSE` for more information.



