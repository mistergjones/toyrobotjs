FROM node:15
# Adding build tools to make yarn install work on Apple silicon / arm64 machines
# RUN apk add --no-cache python2 g++ make
WORKDIR /app
# Copy package.json to current directory
COPY package.json .
RUN npm install
# RUN yarn install --production
# COPY everything to root directory
COPY . .
EXPOSE 2999
#command that will run the container
CMD ["node", "server.js"]



