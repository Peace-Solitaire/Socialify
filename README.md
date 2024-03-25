# Login Page Template

## Overview
Welcome to the Login Page Template repository! This project provides a comprehensive template for a dynamic login system, featuring Google OAuth for authentication and Firebase for storage. 
Built using the MERN stack (MongoDB, Express.js, React, Node.js), this template is designed to offer a robust foundation for any web application requiring user authentication.

## Demo
SignIn Page
![SignUp](https://drive.google.com/uc?export=view&id=1CKx0TPGH7KfqjChk4luddCyReOLxSuU1)
SignUp Page
![SignUp](https://drive.google.com/uc?export=view&id=1ozMfO-uQ_THwbXC5G5rX752--wL79FoS)

## Features
- **Dynamic Login UI:** A responsive and interactive user interface for login, registration, and password recovery.
- **Secure Authentication:** Utilizes bcryptjs for hashing and securing passwords.
- **Session Management:** Integrated with cookie-parser and jsonwebtoken for managing user sessions efficiently.
- **OAuth Integration:** Google OAuth for a streamlined and secure sign-in process.
- **Data Storage:** Utilizes MongoDB for data persistence and Firebase for secure storage solutions.
- **State Management:** Incorporates Redux Toolkit for state management across the React application.

## Project Structure
- **api:** Contains the Node.js server code for handling authentication, user management, and API interactions.
  - **index.js:** Main server file setting up Express server and routes.
  - **routes:** Directory containing Express routers for different API endpoints.
- **client:** Holds the React frontend code, including UI components and pages.
  - **src/components:** Reusable UI components for the login system.
  - **src/pages:** Pages for login, registration, and user profile.
  - **src/redux:** State management setup using Redux Toolkit.
  - **src/App.js:** Main component defining the application routes.
  - **src/index.js:** Entry point for the React application.

## Dependencies

### Backend
- **express:** Framework for building web applications.
- **bcryptjs, cookie-parser, dotenv, express-async-handler, jsonwebtoken, mongoose:** Libraries for authentication, environment configuration, error handling, token management, and database interaction.

### Frontend
- **react, react-dom, react-router-dom:** Core React libraries and routing.
- **@chakra-ui/react, @emotion/react, @emotion/styled, framer-motion:** For UI design and animations.
- **axios:** For making HTTP requests.
- **redux, react-redux, @reduxjs/toolkit, redux-persist:** For state management.
- **firebase:** For Google OAuth and storage.

## Setup

### API
1. Run `npm install` to install dependencies.
2. Set up your MongoDB database and update the connection details in `db.js`.
3. Create a `.env` file in the `root` directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=YOUR_MONGO_DB_CONNECTION_STRING
   JWT_SECRET=YOUR_JWT_SECRET
4. Run `npm run dev` to start the Node.js server.

### Client
1. Navigate to the `client` directory.
2. Run `npm install` to install dependencies.
3. Create a `.env` file in the frontend directory with the following variable:
    ```env
    VITE_FIREBASE_API_KEY=<Your_Firebase_API_Key>
    VITE_FIREBASE_AUTH_DOMAIN=<Your_Firebase_Auth_Domain>
    VITE_FIREBASE_PROJECT_ID=<Your_Firebase_Project_ID>
    VITE_FIREBASE_STORAGE_BUCKET=<Your_Firebase_Storage_Bucket>
    VITE_FIREBASE_MESSAGING_SENDER_ID=<Your_Firebase_Sender_Id>
    VITE_FIREBASE_APP_ID=<Your_Firebase_App_Id>
4. Run `npm run dev` to start the development server.

## Usage
1. Access the application at [http://localhost:5173](http://localhost:5173).
2. Register or log in to explore the app.
3. Enjoy implementing new ideas with a dynamic and professional login page!

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

## License
This project is licensed under the [MIT License](LICENSE).
