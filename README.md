# hack-a-thing-1-projectunknown

## Apps Overview
`tic-tac-toe` is an app to play standard tic-tac-toe in your browser, built using React
`3d-tic-tac-toe` is an app to play a 3D version of tic-tac-toe in your browser, built using React

## What I attempted to build
My goal for this project was to learn about web development for dynamic applications, so I attempted to build a 3D version of the game Tic-Tac-Toe using React. Going into the project, I had no prior experience with JavaScript or React. The Tic-Tac-Toe game has a `history` functionality in which players can jump back in time to prior states of the game board, and players can also adjust the size of the board between `3 x 3 x 3` and `4 x 4 x 4`

## Contributors
I worked alone on this project, and I leveraged the tutorial [https://reactjs.org/tutorial/tutorial.html](https://reactjs.org/tutorial/tutorial.html) to get me started with basic tic-tac-toe.

## What I learned
I learned a number of valuable lessons from this project, spanning the realms of React, CSS, JavaScript, and life in general, which included the following
- All React components must perform as pure functions with respect to their props, i.e., a React component cannot change its own prop
- The render method of a class is called each time an update happens
- The only place in which you can assign this.state is the constructor, otherwise you should use the this.setState() function
- In order to iteratively render a sequence of similar components, you can use mapping like `my\_array.map ( (n) => {return this.renderObjectX(n)})`
- Sometimes its more effective to try something out that you're not sure about and see if it works rather than going very slowly over the theory in your head of why it should work
- I found that I initially learned much more quickly from the 'step-by-step' more theoretical tutorial as opposed to the 'learn by doing' tic-tac-toe tutorial, so in the future when learning new languages or packages I will be sure to learn some of the theory for the language before immediately diving in the implementation of the language.

## What didn't work
There are a few functionalities that I would attempt to build out given more time, including the following
- Users able to adjust the board size to arbitrary size e.g., `7` by `7` by `7`
- Users able to adjust the number of dimensions arbitrarily large, e.g., 5-dimensional chess 
- A nicer GUI that allows users to more easily see the 3D nature of the board and/or an ability to rotate the board
- Ability to play remotely across browsers
