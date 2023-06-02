# Memory Game - Testing details

# Automated Testing

## Testing Lighthouse 

## Testing Validator

# Manual Testing

### Testing User Experience (UX) stories:

- as a user I want to be able to read the instructions of the game by reading the instructions on the homepage.
    - After loading the page, an icon appears on the main page, after pressing on it, we can read the instructions of the game.
- as a user I want to be able to see all 12 double-sided cards random selected.
    - After loading the page, the "play game" button is shown, after pressing it, we can see the page showing game board with 12 cards.
- as a user I want to be able to change the background color.
    - When the game board loads, it also shows 4 icons in different colors. By clicking on them, we can change the design of the entire page (background and board game).
- as a user I want to be able to see the card by clicking on it to match it with another card.
    - Starting the game and pressing on one of the cards, the card rotates so that the user can see what picture is on it and can easily find the card that matches it.
- as a user I want to be activate the timer to the game. 
    - The timer is activated when the game started and the user turned over the first card.
- as a user I want to be activate the move counting. 
    - The move counting is activeted by pressing on the first two cards.
- as a user I want to be able to stop the game at any time during the game.
    - To stop the game, user can press a back button on the top left of the game board.
- as a user I want to be receive a message when all cards have been matched and how many moves have been made at the end of the game.
    - The message with the number of steps and time is always shown after the game is over.
- as a user I want to be able to play again after finishing the game by pressing: "Play Game"
    - The "Play again" button always shows up in the final message.

### Test Cases and Results

1. Home Page:
- After the page loads:
    - An computer generated 2d photo is shown in the background. 
    - The title of the game 'Memory game' is shown, the text is written in large font, in the color of tomates. 
    - Below the user can see two buttons: "Play Game" and "Game Instructions".
        - when the user selects: "game instruction", the modal opens, darkening the entire page, and a div opens in sight where the user can read the description of the instruction game.
        - By selecting the "play Game" option, a new page is loaded where the user has the possibility to start the game.