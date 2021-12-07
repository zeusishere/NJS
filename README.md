# NJS
The web app displays data in a tabular format in real time sent over socket.io  from a Listener service which in turn recieves data at random at every 10 seconds from a Emitter service .
[Project link](http://13.58.21.44:5000/)
## Requirements
1. Node v14.17.3
2. Git
3. MongoDB atlas account (preferred) or MongoDB community server installed.
## steps to setup project on your machine 
1. clone the repository
```
git clone https://github.com/zeusishere/NJSaws.git
```
2. The node_modules is not a part of the cloned repository and should be downloaded using the npm install .
```
npm install
npm install npm-run-all -g / / requires to run multiple processes simultaneously
```
3. Do not forget to replace the mongoDB connection string with yours inside configs/mongoose .
4. To run the project use . run-p stands for run processes concurrently(/parallely)
```
run-p startEmitter startListener startServer
```
## folder structure

|-- undefined \
      |-- .gitIgnore \
      |-- index.js \
      |-- package-lock.json \
      |-- package.json\
      |-- configs\
      |   |-- mongoose.js\
      |-- controller\
      |   |-- person.js\
      |-- helperFunctions\
      |   |-- helperFunctions.js\
      |-- models\
      |   |-- Person.js\
      |-- public\
      |   |-- index.ejs\
      |   |-- index.js\
      |-- resources\
      |   |-- constants.js\
      |   |-- data.js\
      |-- services\
          |-- NJS-Emitter.js \
          |-- NJS-Listener.js 
  
## files
### 1.  index.js 
index.js is the main entry point of the project from where we start the  express server and serve html file .\
### 2.   config
it contains config file to set up mongoose.js which is used to setup mongoDB atlase db .\
### 3.  models
it contains the fileSchema for Person model to be used in database .\
### 4.  controllers
it contains all the actions which map to routes .\
### 5.  NJS-Listener
it contains setup for socket.io server, which listens for events from NJS-Emitter and relays the data corresponding to front-end after successfully validating the data  .\
### 6. NJS-Emitter
it connects to NJS-Listener via sockets , sends encrypted(via AES-256-CTR) random data to Listener every 10 seconds .\
### 7.  public
it contains html , js files to be served to user .\
### 8. package.json
it contains information about all the libraries i.e dependencies required by our project .\
### 9. package-lock.json
it contains information about all the libraries i.e sub-dependencies required by dependencies/librairies used in our project .\
### 10. node_modules
it contains the actual code/files of libraries mentioned in package.json and package-lock.json .\
### 11. helperFunctions 
it contains helper functions to select data at random, hash selected data and lastly encrypt and decrypt data .\
### 12. data
it contains sample data to be used for trasnsport
### 13 . constants
it contains values for algorithm, initialization vector and security keys .
