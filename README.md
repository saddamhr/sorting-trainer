# Sorting Training System

## Description

This project implements the Sorting Training System as part of the Sender frontend opportunity. It allows users to practice sorting a list of people based on a random number of potatoes, from the highest to the lowest. The system tracks the user's time and shows a success message upon correct sorting.

## Features

- **Modal to enter number of people**: Users can specify the number of people to generate, between 20 and 100.
- **Random Data Generation**: Names, emails, and unique potato counts are generated using Faker.
- **Drag-and-Drop Sorting**: Users can reorder the list by dragging and dropping the entries based on the number of potatoes, from most to least.
- **Auto-scroll on Drag**: As users drag an entry towards the top or bottom of the table, the table will automatically scroll to allow seamless reordering without the need to manually scroll.
- **Timer**: The time taken to sort the list is tracked and shown once the user successfully sorts the list.
- **Success Message**: After sorting, a success message with the user's score (time taken) is displayed.


## Folder Structure

The application is structured as follows:

```
/src
  /assets        - Static assets like images, fonts, etc.
  /components    - Reusable Vue components
  /composables   - Reusable logic and functions (Vue Composition API hooks)
/public
  index.html     - Main HTML file
/package.json   - Project dependencies and configurations
/vite.config.js - Vite project configuration
```


## Tech Stack & Best practices

- **Vue.js**: For building the frontend and handling the interactions.
- **CSS Variables**: For color theming and maintaining a consistent design.
- **Composables**: To make the code modular and reusable.
- **Clean Code Practices**: Following industry best practices for clean, readable, and maintainable code.


### Node.js & npm Versions

Ensure you are using the following versions of **Node.js** and **npm** for compatibility:

- **Node.js**: `v20.x.x` (or higher, ensuring compatibility with the latest features)
- **npm**: `v11.x.x` (or higher)

You can check your installed versions by running:

```bash
node -v
npm -v
```

If you need to install or update Node.js and npm, you can follow the installation guide [here](https://nodejs.org/).

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

## Dependencies
- @faker-js/faker: For generating random data like names and emails.
- vue: For building the user interface.
- vuedraggable: For implementing drag-and-drop functionality.
- nanoid: For generating unique IDs.

## Dev Dependencies
- eslint: For linting the code.
- prettier: For code formatting.
- vite: For the build and dev server.

## Usage

1. Upon clicking "Start sorting," a modal will prompt the user to enter the number of people to add to the list.
2. Once the list is generated, the user can drag and drop the rows to reorder them based on the number of potatoes.
3. When the list is sorted correctly, the timer stops, and a success message appears with the user’s score.

## Demo

You can check the live demo and view the project in action by visiting the following link:

- https://6791eabcae29d00008d7390d--sorting-trainer.netlify.app/

## Demo Video

Watch the demo video to see the functionality in action:

- https://drive.google.com/file/d/1cdf7lRbKCxPBrCJjSScgg_NX07kgzQEI/view?usp=sharing
