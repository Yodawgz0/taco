FROM node:18-alpine

# Create app directory and set it as the working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the app directory
COPY . .

RUN npm ci --only-production

RUN npm run build

CMD [ "npm", "start" ]