FROM node:18.17.1-slim AS dependencies
RUN apt-get update -y
RUN apt-get install -y openssl
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn && yarn cache clean

FROM node:18.17.1-slim AS development
WORKDIR /usr/src/app
COPY ./src ./src
COPY tsconfig.build.json tsconfig.json  ./
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY --from=dependencies /usr/src/app/package.json /usr/src/app/yarn.lock ./
RUN yarn build
RUN rm -rf node_modules/*

# # # differnt NODE_ENV for production and yarn install for production (via the NODE_ENV)
FROM node:18.17.1-slim AS production
RUN apt-get update -y
RUN apt-get install -y openssl
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
COPY --from=development /usr/src/app/dist ./dist
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
CMD ["yarn", "start:prod"]