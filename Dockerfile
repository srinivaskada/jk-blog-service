# Base image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

RUN ["chmod", "+x", "docker-entrypoint.sh"]

# Creates a "dist" folder with the production build
RUN npm run build

ENTRYPOINT ["sh", "docker-entrypoint.sh"]