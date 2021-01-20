# WEB-ISO

WEB-ISO is a Angular application for creating customer instances.

## Installation

* Install Node JS: ```https://nodejs.org/en/download/```
* Install Angular CLI: ```npm i @angular/cli```
* Install dependencies for server and client: 
  * Go to client folder and install dependencies using ```npm install```
  * Go to server folder and install dependencies using ```npm install```

## Docker

* WEB-ISO Server:
 * Build docker image: ```docker build -t web-iso-server .```
 * Run docker container: ```docker run -d -p port:3000 web-iso-server``` 

## Documentation

* Client uses Compodoc: 
  * Run documentation server: ``` compodoc -p tsconfig.json src -s```
  * After starting the server, the documentation is available on ```http://127.0.0.1:8080```
* Server uses JSDoc :
  * Documentation is available in ```server/documentation```.

## License

