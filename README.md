# Getting Started with Volume UI

## Requirements
- yarn

## Getting started
After cloning the repo to your local device, you can run the following command:

```
yarn install
```

This will install all the dependencies needed for the UI.

Please follow the volume-core guide on how to deploy the contract first before running the UI.

After you deployed the contracts, you should update the volumeAddress value in the DeploymentConfig.js file.
This is extremely important to do, otherwise the page will not function correctly.

After you deployed and made the changes to the contract address, you can run the following command:

```
yarn start
```

The top bar should show 100% - this will confirm it is reading from the contract.

You are now free to change whatever you want - enjoy! :)
