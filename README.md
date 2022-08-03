# Zoomies

An online trivia quiz game where users can choose the category of the quiz, difficulty, number of questions and type of question asked. The users results are then updated on the leaderboards.

## Demo

<p align="center"><img src="/zoomies.gif"></p>

## Remote Hosting

- API is hosted on heroku in https://zoomies-api.herokuapp.com/
- Website is deployed on netlify in https://zoomies.netlify.app

## Contributors

- Sidar
- Luiz
- Melissa
- Evie

## Installation

- Clone or download the repo
- Open terminal and navigate to server folder
- Input `cd server` in terminal to navigate to folder with `package.json` file
- Run npm install to install dependencies
- Return to lowest directory by inputting `cd ..` in terminal
- Navigate to client folder
- Input `cd client` in terminal to navigate to folder with `package.json` file
- Run npm install to install dependencies

### Usage

- Make sure you have Docker running
- Input `docker compose up` in terminal to get server running
- Open a new terminal
- Navigate to client folder with input `cd client`
- Input `npm run start` this command will open client side to http://localhost:3000
- To kill server input `ctrl c` in the live terminal
- To prune docker container first input `docker compose down` followed by `docker volume prune`

## Wins

- Timer functionality that skips questions and displays the correct answer
- Utilizing redux and its store to select certain actions and states, also resetting the store with certain buttons
- Using different types of react hooks to make cleaner code
- Using opendbt's Trivia API and using React to use specific parts of the API
- Displaying leaderboards dynamically
- Functionality on classes, allowing correct answers to show green and incorrect answers to show red

## Challenges

- Frontend testing
- Websockets

## Future Features

- Include an additional API which can include own questions
- Allow multiple users to play one quiz together
