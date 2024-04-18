Seth Frank
Jacob Silvester
Nicolas Valentino
Spencer Greene
Connor Chartier

Our program uses the chat feature in a way that each client can click a button and change the color of the other clients' backgrounds and logs each change to each participant.

We faced challenges with the button going away and also we ran into an issue where our changeColor() function was within the ws.onopen() which made the function no longer in the scope to be attached to the button that calls the function.