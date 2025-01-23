# Sorting Training System

## Description

This project implements the Sorting Training System as part of the Sender frontend opportunity. It allows users to practice sorting a list of people based on a random number of potatoes, from the highest to the lowest. The system tracks the user's time and shows a success message upon correct sorting.

## Features

- **User Input:** Users can enter a number between 20 and 100 to generate the list of people.
- **Random Data Generation:** Each person has a random email, unique potatoes, and random name.
- **Drag-and-Drop Sorting:** Users can reorder the list from most potatoes at the top to least potatoes at the bottom.
- **Timer:** A timer starts when the list is generated and stops when the user successfully sorts the list.
- **Success Message:** After successful sorting, the system displays the time taken as a score.

## Tech Stack

- **Vue.js**: For building the frontend and handling the interactions.
- **CSS Variables**: For color theming and maintaining a consistent design.
- **Composables**: To make the code modular and reusable.
- **Clean Code Practices**: Following industry best practices for clean, readable, and maintainable code.

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/saddamhr/sorting-trainer.git
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:

   ```
   npm run dev
   ```

4. Open the application in your browser at `http://localhost:5174`.

## Usage

1. Upon clicking "Start sorting," a modal will prompt the user to enter the number of people to add to the list.
2. Once the list is generated, the user can drag and drop the rows to reorder them based on the number of potatoes.
3. When the list is sorted correctly, the timer stops, and a success message appears with the user’s score.

## Demo

You can check the live demo and view the project in action by visiting the following link:

- https://6791c2d81ccfba7bdd287cf9--sorting-trainer.netlify.app/

## Demo Video

Watch the demo video to see the functionality in action:

- [Demo Video Link]
