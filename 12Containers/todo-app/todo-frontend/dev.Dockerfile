FROM node:20

WORKDIR /usr/src/app

COPY . .

# Change npm ci to npm install since we are going to be in dev mode
RUN npm install

#npm run dev is the command to start the app in dev mode
CMD ["npm", "run", "dev", "--", "--host"]
# Note the extra parameters -- --host in the CMD. 
# Those are needed to expose the development server to be visible outside the Docker network. 
# By default the development server is exposed only to localhost, and despite we access the frontend still using the localhost address, it is in reality attached to the Docker network.