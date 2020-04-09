FROM node:13-alpine

ARG APP_DIR=/usr/src/app

RUN mkdir -p ${APP_DIR} && chown -R node:node ${APP_DIR}
RUN mkdir ${APP_DIR}/client && chown -R node:node ${APP_DIR}/client
WORKDIR ${APP_DIR}

COPY package*.json ./
COPY ./client/package*.json ./client/

USER node

#RUN npm install --silent
RUN npm run install-deps --silent

COPY --chown=node:node . .

EXPOSE 3000

# Run the app when the container launches
CMD ["npm", "run", "dev"]