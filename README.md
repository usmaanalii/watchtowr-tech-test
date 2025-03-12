# Shopping List Application

This is a full-stack application for managing a shopping list. The backend is built with NestJS and GraphQL, while the frontend is built with React, TypeScript, and Vite.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Getting Started

### Backend

1. Navigate to the `backend` directory:

   ```sh
   cd backend
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Start the backend server:

   ```sh
   npm run start
   ```

   The backend server will be running at `http://localhost:4000/graphql`.

### Frontend

1. Navigate to the `frontend` directory:

   ```sh
   cd frontend
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Start the frontend development server:

   ```sh
   npm run dev
   ```

   The frontend application will be running at `http://localhost:5173`.

## Functionality

The Shopping List Application provides the following functionality:

- **View Shopping List**: Displays a table of shopping items with their name, quantity, and creation date.
- **Add Item**: Allows users to add a new item to the shopping list by entering the item name and quantity.
- **Delete Item**: Allows users to delete an item from the shopping list.

The frontend communicates with the backend using GraphQL to fetch, add, and delete shopping items.

## Running Tests

I struggled with setting up the test suites, but I have provided some high level tests for reading purposes, I would have provided more
specific component level tests as well as tests for the hook, but I was limited in not being able to run them.
