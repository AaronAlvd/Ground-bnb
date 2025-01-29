# GroundBnb - Airbnb Clone

Welcome to **GroundBnb**, a clone of the Airbnb platform! This web application allows users to browse, book, and review spots, with full **CRUD** (Create, Read, Update, Delete) functionality for spots, users, and reviews.

[GroundBnb](https://ground-bnb-n5l7.onrender.com/)

![Web App Screenshot](./frontend//public/GroundBnb.png)

## Features

- **User Management:**
  - Register and login to the platform.
  - View and edit user profiles.
  
- **Spot Management:**
  - Create, read, update, and delete spots.
  - View spot details, including images, description, price, and location.

- **Review System:**
  - Users can create, update, and delete reviews for spots.
  - View all reviews for each spot.

## Technologies Used

- **Backend:**
  - Node.js
  - Express.js
  - PostgreSQL (relational database)
  - Sequelize (PostgreSQL ORM)
  
- **Frontend:**
  - React.js
  - React Router (for routing)
  - Axios (for HTTP requests)

- **Authentication:**
  - JWT (JSON Web Token) for user authentication

- **Deployment:**
  - Render (for cloud hosting and deployment)

## API Endpoints

### User Endpoints
- **POST /users/register** – Register a new user.
- **POST /users/login** – Login to an existing account.
- **GET /users/me** – Get the currently authenticated user's profile.
- **PUT /users/me** – Update the user's profile information.

### Spot Endpoints
- **POST /spots** – Create a new spot.
- **GET /spots** – Get a list of all spots.
- **GET /spots/:id** – Get details of a specific spot.
- **PUT /spots/:id** – Update a spot's details.
- **DELETE /spots/:id** – Delete a spot.

### Review Endpoints
- **POST /reviews** – Create a new review for a spot.
- **GET /reviews/spot/:spotId** – Get all reviews for a specific spot.
- **PUT /reviews/:id** – Update a review.
- **DELETE /reviews/:id** – Delete a review.

## Setup Instructions

### Prerequisites

- Node.js (>= v14)
- PostgreSQL (or use a cloud PostgreSQL instance)
- Sequelize CLI for managing migrations and models
- npm or yarn for package management

### Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/aaronalvd/groundbnb.git
