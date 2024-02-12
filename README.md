# Restaurant Management Service

## Features Implemented

### Restaurant Management

- **Create Restaurant**: Users can create a new restaurant with details such as restaurant name, unique-name (slug), and cuisines.
- **List Restaurants**: An API endpoint to list all restaurants, with the ability to filter by cuisine.
- **Retrieve Restaurant Details**: An API endpoint to retrieve specific restaurant details by ID or unique-name (slug).
- **Find Nearby Restaurants**: An API endpoint to find nearby restaurants within a 1 KM radius using MongoDB GeoSpatial Queries.

### User Interaction

- **User Schema**: Define a User Schema with details such as full name and favorite cuisines.
- **User-Restaurant Relationship**: Define a Schema for Users following Restaurants, allowing multiple users to follow multiple restaurants.
- **Get User Recommendations**: An API endpoint that takes a User ID as input and returns users who share the same favorite cuisine, as well as the list of restaurants followed by those users.

## Tech Stack

The technical stack used for this project includes:

- Nest.js & TypeScript: Leveraging the full capabilities of Nest.js with TypeScript for backend development.
- Express.js: Utilizing Express.js as the underlying HTTP server framework.
- MongoDB & MongoDB DataPipeline Aggregation: Implementing MongoDB for data storage, utilizing it for complex queries.
- Mongoose: Using Mongoose for schema definition and data management.

## Architecture

The solution adheres to the following architectural principles:

- **Modular Design**: The application follows a modular architecture using Nest.js services, modules, and dependency injection to ensure clean code.
- **Clean Code**: The code prioritizes readability and maintainability. Comments are used to explain complex logic, and the DRY (Don't Repeat Yourself) principle is followed.
- **Reusable Components**: Filters and data manipulation layers are designed to be reusable across different parts of the application.
- **Environment Configuration**: The MongoDB connection URL is stored in an .env file, which is excluded from the Git repository.
- **Input Validation**: Thorough validation is implemented for all user inputs to ensure data integrity and security.

## Running the Application

To run the Pleny Nest.js application, follow these steps:

1. Clone the repository: `git clone https://github.com/Ma-Gohary/restaurant-management-service.git
2. Install dependencies: `yarn install`
3. Set up the environment variables: Create a `.env` file at the root of the project and provide the MongoDB connection URL.
4. Start the application: `yarn start`
5. Access the API documentation: Open your browser and visit `http://localhost:{PORT}/restaurant-service/api/docs` to view the Swagger documentation.