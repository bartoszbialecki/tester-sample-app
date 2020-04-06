# tester-sample-app [![Build Status](https://travis-ci.com/bartoszbialecki/tester-sample-app.svg?branch=master)](https://travis-ci.com/bartoszbialecki/tester-sample-app)

This app is used for Software Tester classes on continuous integration and delivery.

This repository is connected with Travis CI and every commit to the master branch will cause Travis to trigger a new build.

- To work with the project we have to install all dependencies

  `$ npm install-deps` or `$ yarn install-deps`

- To start application to develop

  `$ npm run dev` or `$ yarn dev`

- To run tests

  `$ npm test` or `$ yarn test`

- To run linter

  `$ npm run lint` or `$ yarn lint`

- To start application in production

  - Build react application

    `$ npm run build` or `$ yarn build`

  - Start server application

    `$ npm start` or `$ yarn start`
