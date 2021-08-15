# Installation for development


This application uses _React_, _Nodejs_ and _NPM_, please follow the steps below to get the application up and running.
___

### Setting up enviroment

**Install Git:** (https://git-scm.com/)

You must install git to be able to clone, commit, push, pull changes to github.


**Install Node:** (https://nodejs.org/en/download/)

Nodejs is the chrome V8 engine that allows us to run javascript code on the server side. It will be used on the construction of the back-end.

**Update NPM:** 
`npm install -g npm`

NPM is the default package manager from Nodejs, make sure to update it to the latest version to avoid conflicts. It will be used to install new dependencies to the project.

**Install Nodemon:** `npm install -g nodemon`

Even though we don't need this one to make the project work, nodemon will make back-end development easier, since it observe changes and restart the API server automatically to make them take effect.

### Setting up front-end

**Install React CLI:** `npm install -g create-react-app`

create-react-native is a command line interface used to create, build and run react projects.

### Setting up back-end

**.env:** download .env file and drag into backend folder

The .env file keeps enviroment variables that are used when running the backend (dburl, passwords, port, etc)
The file is available on discord chat, but you can ask some member of the group for help if you don't find it.

### Running the application

**Run front-end:** 
```
cd Code/frontend
npm install
npm start
```

**Run back-end:**
```
cd Code/backend
npm install
npm start
```
