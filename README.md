# About the Project

1. this is a lottery project. the contract is already deployed
2. anyone can participate in the lottery and only the manager can declare the winner only if there is 3 or more participants.
3. the lottery price is 5 Gwei (i know its very less but due to lack of testnet eth i have to do this). So if the participant has more then 5 gwei in the wallet then it can participate in the lottery as many times he wants.
4. at the top the manager address, lottery prize, the total number of participants and the winner address is displayed.
5. in manager section he can check the address whether he/she is participated in the lottery or not and can also declear the winner.
6. in participant section the participant address is displayed, their wallet balance and the lottery price is displayed. and one button through which he can participate in the lottery.

## `Note :`

1. right now the contract is deployed in the ganache so so probabaly this will not work on your site.(ofcourse this will be deployed to the testnet after it finished and you will run it). so to run the dapp you have to deploy the Lottery2.sol on ganache on your site. and the change the address of the contract in the ContractInteraction.js file.

## about this commit:

1. in this i updated the contract (lottery.sol --> lottery2.sol) so i can show the total number of participants of the lottery and also i can check that the address is participated in the lottery or not.
2. currently the manager section is not functional.
3. make sure that you are running the ganache in background and deployed the lottery2.sol in your ganache and change the address of the contract in the ContractInteraction.js file.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
