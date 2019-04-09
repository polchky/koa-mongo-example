# koa-mongo-example

## Prerequisites
In order to run this project you must have the following installed: 
- Git
- NodeJS (10+) with npm
- MongoDB (the service must be running)
- Know about NodeJS, specifically about asynchronous programming (callbacks, promises and async/await)
## Installing the Project
To download and install the project, execute the following commands:
```
git clone https://github.com/polchky/koa-mongo-example.git
cd koa-mongo-example
npm install
cp .env.sample .env
```
## Running the Project
The run the project execute this command: 
```
npm run start_dev
```
## API Documentation
The API is documented using OpenAPI. An interactive documentation page is available at http://localhost:3000/doc.
To start: register an account using the **/register** endpoint, and login using the **/login** endpoint. You should receive a token, which you can use with the **Authorize** button. Enter the token value, click *Authorize* and then *close*. Your are now able to use all endpoints, including those requiring an authentication (with a lock on the right).

## Code Explanations
The code is explained mostly using comments. The main assumptions is that you are confident with server-side javascript and asynchronous programming. Here are some
concepts: 

### Libraries
If you take a look at the ```package.json``` file, you'll see that all the libraries we need are present under the ```dependencies``` object. There are also some development libraries, that are not used for production: ```nodemon``` is used to listen to code changes and restart the server automatically, and ```dotenv``` is used to load environment variables (see below).
To install a library and save the reference in the ```package.json``` file, use 
```npm install <mylib> --save``` 
or
```npm install <mylib> --save-dev```
This way, anyone who uses your code can re-install the libraries easily, since you commit the ```package.json``` file containing all dependencies.

### Environment variables
Some environment variables are accessed using ```process.env.<var>```. These are either platform-specific variables such as the port to start the server with, or other variables such as secrets, which should not be stored anywhere. In production, these variables are often passed as parameters when starting the server. For the development however, this would be annoying. This is why we create a ```.env``` file to store them. This file must **NOT** be committed with your code (e.g. on Github), we indicated that in the ```.gitignore``` file. When you start the server, a script in the ```package.json``` file is called, which uses a library to load all variables in a ```.env``` file. Note that if you created a ```.env``` file by copying the ```.env.sample``` one, you should at least change the secret values to some random strings. 

### Swagger and Swagger UI
Swagger is the name often associated with the OpenAPI specification, which specifies a way of documenting REST APIs. The result of this documentation is a ```swagger.json``` file. For convenience purposes, this document can be transformed into a static web page to interact directly with the documented server. In this project there are two libraries for swagger: ```swagger-jsdoc``` to create the document by reading annotated code comments, and ```koa2-swagger-ui``` to create the page.

### Koa Middlewares
Koa is a minimalist framework, this is why we need to use Koa libraries (called middlewares) for almost everything, including basic routing. Using or creating a middleware is really simple: all you need to do is to provide a function with two arguments: ```ctx``` and ```next```. ```ctx``` is a variable containing all the information about the request, the response, the libraries, etc. and is passed between the different middlewares. ```next``` is a function that the middleware should call **if** and **when** it wants to trigger the next middleware. For instance, in the code, if the ```jwt``` middleware is called, it will check whether or not a token is present (and valid) in the request. If yes, it call the next middleware (the controller), if not it will stop the request and return an error.
In the ```index.js``` file, note the order in which the middlewares are called. You'll see that the ```jwt``` one is not called here, but on a per route basis in the ```/route``` folder. 

### Routing

In the main file, we ```require``` the routing files and call them as a function, passing the ```koa-router``` library as argument. In each routing file, we will use this router lib to register all the different routes. In a given routing file (e.g. ```/routes/users.js```, the ```module.exports```, which is what we actually ```require``` when including a file, is a function (that's why we can call it, passing the routing lib as parameter). What we do in this function is firstly to register a parameter: ```userid```. What this does is call the ```getById``` function of the controller, which is simply an extra middleware to call before the "actual" route controller, for all the routes having a ```user_id``` path parameter. It fetches a user based on the id param of the path, and registers it into the ```ctx```.  If not found, it directly returns an error. 
All the routes are then registered, calling the ```jwt``` as a middleware before the controller if an authentication is needed. 

### Using MongoDB
The most popular driver for MongoDB is Mongoose, which is fairly straightforward to use. Models are registered using schemas. Mongoose functions are then called, returning a promise. Async/await can thus be used to facilitate functions usage. Query population is used to retrieve associated resources (e.g. the owner of a book). 
