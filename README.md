## Concepts
* REST API principals
    * CRUD
    * HTTP methods
* JWT & refresh tokens
* Request validation
## Technologies
* Node.js
* Mongoose
* TypeScript
* Express.js 
* Zod validation
* Swagger documentation 

##  structure
1. What are we going to build (Swagger documentation demo - Philadelphia bike-sharing)
2. Code walk-through
3. Bootstrap application
   1. Setup express JS
   2. Create routes function
   3. Setup database connection
   4. Setup logger
   5. Validate request middleware
4. Bike/Station resource
   1. Insert data to fetch from indigo Bike service
   2. Retrieve from database & transform data for  all stations at a specified time
   3. Retrieve from database & transform data for one station at a specific time
   4. Retrieve from database & transform data for one station over a range of times

## How to run application on your local machine
* move to project directory using cd command 
* Update database connection URL for mongo inside file config->default.ts
* RUN docker-compose up -d --build
* RUN  yarn build
* RUN  yarn dev

Note: You will need Docker installed locally if you want to test your Docker configutation

