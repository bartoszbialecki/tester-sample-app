# tester-sample-app [![Build Status](https://travis-ci.com/bartoszbialecki/tester-sample-app.svg?branch=master)](https://travis-ci.com/bartoszbialecki/tester-sample-app) [![Uptime Status](https://app.statuscake.com/button/index.php?Track=6acAjhnvPa&Days=1&Design=4")](https://www.statuscake.com)

This app is used for Software Tester classes on continuous integration and delivery.

This repository is connected with Travis CI and every commit will cause Travis to trigger a new build. Master branch will be deployed to the staging environment, tags to the production environment. Travis run linter and tests and then deploy the application on Heroku.

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
