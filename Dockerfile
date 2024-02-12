FROM node:18.17.1-slim AS dependencies
RUN apt-get update -y
RUN apt-get install -y openssl
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY . .
RUN yarn && yarn cache clean
RUN yarn build
CMD ["yarn", "start"]