# koa-mongo-example

## Prerequisites
In order to run this project you must have the following installed: 
- Git
- NodeJS with npm
- MongoDB (the service must be running)
## Installing the project
To install the dependencies execute the following commands:
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