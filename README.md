#Magic Transporters

#Introduction:
Welcome to Magic Transporters, a futuristic platform for transporting items using virtual magic! Magic Movers with unique abilities and gadgets make quick, magical deliveries possible.

#Features:
Add Magic Movers with attributes such as weight limit and quest state.
Add Magic Items with specified weights.
Load Magic Movers with items while validating constraints like weight limits.
Start and End Missions for Magic Movers, maintaining a comprehensive log of activities.
Fetch a leaderboard of the most missions completed by Movers.


#Tech Stack
Backend: Node.js, Express.js
Database: MongoDB with Mongoose ODM
Language: TypeScript
Dependency Injection: Tsyringe
Authentication: JWT
Password Hashing: bcrypt
Validation: Express Validator
Logging: Winston
Testing: Jest and Supertest
Containerization: Docker and Docker Compose
Documentation: Swagger UI


#Setup and Installation
  #Prerequisites
    Node.js (>= 20.16.0)
    Docker (>= 20.x)
    Docker Compose (>= 1.29)
    MongoDB (optional for local development without Docker)
    
  ##Steps to Run Locally
  Clone the Repository:

  git clone https://github.com/your-repo/magic-transporters.git
  cd magic-transporters
  Install Dependencies:

  npm install
  Set Up Environment Variables: Create a .env file in the root directory with the following content:

  env

  MONGO_URI=mongodb://localhost:27017/magic_transporters
  JWT_SECRET=your_jwt_secret
  Run the Server:

  npm run dev
  Access the API: The server runs on http://localhost:3000. Visit http://localhost:3000/api-docs for Swagger documentation.

  ##Using Docker
  Build and Run the Containers:

   docker-compose up --build
   Access the Application:

   API: http://localhost:3000
   Swagger Docs: http://localhost:3000/api-docs


#Endpoints:
HTTP Method	Endpoint	Description
POST	/movers	Add a new Magic Mover
POST	/items	Add a new Magic Item
PUT	/movers/:moverId/load	Load items into a Magic Mover
PUT	/movers/:moverId/start	Start a mission
PUT	/movers/:moverId/end	End a mission
GET	/movers/leaderboard	List Magic Movers by missions completed

#Project Structure

src/

├── config/                  # Configuration files                                                                                                                                                                       
│   ├── db/                  # Database connection setup                                                                                                                                                                 
│   │   └── db.connection.ts                                                                                                                                                                                             
│   ├── jwt/                 # JWT authentication configuration                                                                                                                                                          
│   │   └── jwt.ts
│   └── swagger/             # Swagger configuration                                                                                                                                                                     
├── controllers/             # Handles request and response logic                                                                                                                                                        
├── middlewares/             # Middleware for validation and other utilities                                                                                                                                             
├── models/                  # Mongoose schemas for MongoDB                                                                                                                                                              
├── routes/                  # API route definitions                                                                                                                                                                     
├── services/                # Business logic for the app                                                                                                                                                                
├── utils/                   # Utility functions (e.g., logger)                                                                                                                                                          
│   └── logger.ts            # Winston logging setup                                                                                                                                                                     
├── validation/              # Validation rules for request payloads                                                                                                                                                     
│   ├── magicMoverValidationRules.ts                                                                                                                                                                                     
│   ├── magicItemValidator.ts                                                                                                                                                                                            
├── app.ts                   # Express app configuration                                                                                                                                                                 
├── server.ts                # Application entry point                                                                                                                                                                   
tests/                       # Test cases for APIs                                                                                                                                                                       
Dockerfile                   # Docker container setup                                                                                                                                                                    
docker-compose.yml           # Multi-container setup for app and MongoDB                                                                                                                                                 



