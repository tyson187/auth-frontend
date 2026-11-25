# Angular Authentication Frontend

## Project Description

This project is a web application frontend developed using Angular. It connects to a Node.js backend API to handle user authentication and other application features.

The system allows users to register, log in, and access protected pages. It uses modern Angular features to make the application easier to manage, maintain, and develop.

This project demonstrates how frontend and backend technologies work together to create a functional web application.

## Features

- User Registration
- User Login
- User Authentication
- JWT Token Authentication
- Authentication Service
- Authentication Interceptor
- Error Interceptor
- Route Guards
- Lazy Loading
- Angular Signals
- RxJS for asynchronous operations
- Protected Routes
- API Integration with Node.js Backend
- User Logout
- Responsive User Interface

## Technologies Used

| Technology | Purpose |
|---|---|
| Angular | Frontend framework |
| TypeScript | Programming language |
| HTML | Page structure |
| CSS | Page design and styling |
| Node.js | Backend runtime |
| Express.js | Backend API framework |
| MySQL | Database |
| JWT | User authentication |
| RxJS | Handling asynchronous data |
| Angular Signals | Managing reactive state |

## Setup Instructions

### 1. Requirements

Make sure you have installed the following:

- Node.js
- npm
- Angular CLI
- Visual Studio Code
- Git

### 2. Clone the Repository

Open your terminal and run:

```bash
git clone YOUR_REPOSITORY_URL
```

Go to the project folder:

```bash
cd YOUR_PROJECT_FOLDER
```

### 3. Install Dependencies

Run the following command:

```bash
npm install
```

This will install the required packages for the Angular project.

### 4. Configure the Backend API

Make sure your Node.js backend is running.

Check the API URL in your Angular environment configuration.

Example:

```typescript
export const environment = {
  apiUrl: 'http://localhost:3000/api'
};
```

Change the URL based on your backend configuration.

### 5. Run the Angular Application

Start the development server:

```bash
ng serve
```

Open your browser and visit:

```text
http://localhost:4200
```

The Angular application should now be running.

### 6. Test the Application

1. Open the application in your browser.
2. Register a new account.
3. Log in using your account.
4. Check if the protected pages can be accessed.
5. Test the logout function.
6. Verify that the frontend can communicate with the backend API.

## Screenshots

The following screenshots show the different pages of the application.

### Login Page

![Login Page](screenshots/login.png)

The login page allows users to enter their email and password to access their account.

### Registration Page

![Registration Page](screenshots/register.png)

The registration page allows new users to create an account.

### Dashboard Page

![Dashboard Page](screenshots/dashboard.png)

The dashboard displays the main page that users can access after logging in.

### Other Pages

Add screenshots of your other application pages below.

![Other Page](screenshots/other-page.png)

**Note:** Create a folder named `screenshots` in your project and place your actual screenshots inside it. Update the image filenames based on your screenshots.

## Reflection Questions and Answers

### 1. What are the three main modern Angular features you used in this project? How do they improve the developer experience?

The three main modern Angular features I used are Signals, Standalone Components, and the new Control Flow syntax.

Signals make it easier to manage and update data. Standalone Components make components easier to organize without depending on large modules. The new Control Flow syntax makes templates easier to read and understand.

These features help developers write cleaner and more organized code.

### 2. Explain the difference between Signals and RxJS. When would you use each?

Signals are used to manage reactive state inside the application. They are useful for storing values such as the current user or login status.

RxJS is used to handle asynchronous operations such as HTTP requests, API responses, and events.

I would use Signals for simple application state and RxJS for handling API communication and asynchronous data.

### 3. Why is it important to have both an auth interceptor and an error interceptor?

An auth interceptor automatically adds the authentication token to HTTP requests when needed.

An error interceptor handles errors from the backend, such as unauthorized requests or server errors.

Both interceptors help reduce repeated code and make the application easier to maintain.

### 4. How do route guards improve security and user experience?

Route guards control whether users can access certain pages.

For example, an authentication guard prevents users who are not logged in from accessing the dashboard.

This improves the user experience because users are redirected to the login page when they try to access protected pages.

Route guards are not complete security by themselves. The backend must also check authentication and authorization.

### 5. What is lazy loading and why is it important for performance?

Lazy loading means loading certain parts of the application only when they are needed.

Instead of loading every page at the beginning, Angular loads a page when the user visits it.

This can reduce the initial loading time and improve application performance.

### 6. Explain the "single source of truth" principle in the context of your AuthService.

The single source of truth means that important authentication information is managed in one central place.

In this project, the AuthService manages the user's authentication state.

Other components can use the AuthService to check whether the user is logged in.

This prevents different components from having different or incorrect login information.

### 7. What challenges did you face when connecting the Angular frontend to the Node.js backend? How did you solve them?

One challenge I faced was connecting the Angular frontend to the correct backend API endpoints.

I also needed to handle authentication tokens and API errors properly.

I solved these problems by checking the API routes, configuring the correct API URL, using Angular HTTP services, and adding interceptors for authentication and error handling.

I also tested the API requests to make sure the frontend and backend were communicating correctly.

### 8. If you had to add a new feature, such as user profile editing, how would you approach it using the patterns you learned?

First, I would create a new profile component where users can view and edit their information.

Next, I would create an API service method to send the updated information to the backend.

I would use the AuthService to access the current user's information and an authentication interceptor to attach the token to the request.

I would also add form validation, error handling, and a route guard if the page requires authentication.

### 9. What security considerations did you implement in the frontend?

I used authentication tokens to identify logged-in users and an authentication interceptor to send the token with protected API requests.

I also used route guards to prevent unauthorized navigation to protected pages.

For security, I avoided directly inserting untrusted HTML into the page and relied on Angular's built-in protections against common cross-site scripting attacks.

Sensitive authentication information should be handled carefully. For production applications, secure, HttpOnly cookies are often preferred over storing long-lived tokens in localStorage because JavaScript cannot directly read HttpOnly cookies.

The backend must also validate user input and protect sensitive API endpoints.

### 10. How does this Angular frontend demonstrate the "Integrative Programming" concepts from this course?

This project demonstrates Integrative Programming because it combines different technologies to create one working application.

Angular handles the frontend and user interface, while Node.js and Express.js handle backend requests and application logic.

The frontend communicates with the backend through API requests. Authentication, routing, services, and database operations work together to provide the application's features.

This project helped me understand how different programming technologies can be connected to build a complete system.

## Conclusion

This project helped me improve my knowledge of Angular and frontend development.

I learned how to use modern Angular features, manage authentication, connect to a backend API, and protect application routes.

It also helped me understand the importance of writing clean, organized, and secure code.

Overall, this project gave me practical experience in building a frontend application that works together with a backend system.