# Movie Streaming Dashboard

## Overview

Welcome to the Movie Streaming Dashboard project. This application is designed to provide users with a seamless experience for browsing and viewing movies. Built with JavaScript and Vue.js, the dashboard connects to an external movie database to fetch and display movie information dynamically.

## Table of Contents

1. [Objective](#objective)
2. [Project Setup](#project-setup)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
3. [Usage](#usage)
   - [Connecting to the Movie Database](#connecting-to-the-movie-database)
   - [Features to Implement](#features-to-implement)
<!-- 4. [Development Guidelines](#development-guidelines) -->
4. [Testing](#testing)
5. [Deployment](#deployment)
<!-- 6. [Contributing](#contributing) -->
6. [License](#license)
7. [Contact](#contact)

## Objective

The goal of this project is to implement a movie streaming dashboard that allows users to explore a wide range of movies, view detailed information, and search for specific titles. The application is built using JavaScript and Vue.js, leveraging modern web development practices.

## Project Setup

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Install the latest version from [nodejs.org](https://nodejs.org/).
- **npm**: Node.js package manager, which is included with Node.js installation.
- **Vue.js**: Familiarity with Vue.js framework is recommended.

### Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**

   Open your terminal and run:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install project dependencies:**

   Run the following command to install all necessary packages:

   ```bash
   npm install
   ```

3. **Start the development server:**

   Launch the application with:

   ```bash
   npm run dev
   ```

   The application will be accessible at `http://localhost:8080` by default.

## Usage

### Connecting to the Movie Database

The application connects to the **CodeSubmit Movie Database** to fetch movie data. Ensure you use the following authentication header in your requests:

```
Authorization: Bearer Wookie2021
```

### Features to Implement

- **Design Implementation**: Follow the design specifications provided in the `/Designs` folder.
- **API Integration**: Fetch movies from the API and display them, categorized appropriately.
- **Detail View**: Implement a detailed view for each movie, showcasing additional information.
- **Navigation and Bookmarking**: Ensure smooth navigation and bookmarking functionality.
- **Search Functionality**: Implement a search feature using the endpoint `https://wookie.codesubmit.io/movies?q=<search_term>`.

<!-- ## Development Guidelines

- Adhere to JavaScript best practices for clean and maintainable code.
- Organize Vue components logically, ensuring reusability and clarity.
- Document your code thoroughly to facilitate understanding and maintenance. -->

## Testing

- In this project, I have implemented tests for the HomePage and DetailPage components using the Vitest framework.
```bash
   npm run test
   ```
<!-- - Implement tests to verify the functionality and reliability of your code. -->
<!-- - Use a testing framework such as **Jest** or **Mocha** to write and run your tests. -->

## Deployment

To prepare your application for production, follow these steps:

1. **Build the project:**

   Run the build command to generate production-ready files:

   ```bash
   npm run build
   ```

2. **Deploy the `dist` directory:**

   Upload the contents of the `dist` directory to your preferred hosting service.

<!-- ## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes with clear and descriptive messages.
4. Submit a pull request detailing your changes and the problem they solve. -->

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Contact

For questions, feedback, or support, please contact:

- **[Your Name]**
- **Email**: [Your Email]

---

Thank you for your interest in the Movie Streaming Dashboard project. We look forward to your contributions and feedback.

The Media Vision Group | MVG Team