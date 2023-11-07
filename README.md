# Full-Stack JavaScript Application

This repository contains a full-stack JavaScript application with a React front-end created with Vite, and an Express.js back-end.

## Structure

- `/web` - Contains the ReactJS Vite application.
- `/api` - Contains the ExpressJS API.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have Node.js installed on your system (the version should be compatible with what is defined in the `package.json` files). You can check your Node.js version by running `node -v` in the terminal.

### Installation

First, clone the repository to your local machine:

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

## API

Located in the `/api` directory, this is a basic starter for an Express.js API.

### Setting up the API

Run the following commands to set up and start the API:

```bash
cd api
npm install
npm run dev
```

The `npm run dev` command will start the Express server with `nodemon`, watching for changes.

### Testing and Linting the API

To run tests and lint your code:

```bash
npm test
npm run lint
```

## Web Application (Front-end)

Located in the `/web` directory, `hot-dog-hunt` is a React application using Vite.

### Setting up the React Application

Run these commands to install dependencies and start the development server:

```bash
cd web
npm install
npm run dev
```

The `npm run dev` command starts the Vite dev server, typically on `http://localhost:5173`.

### Building the React Application

For a production build:

```bash
npm run build
```

### Linting the Web Application

To lint your code:

```bash
npm run lint
```

## Building for Production

To build both applications for production, run the build commands in their respective directories.

### API

```bash
cd api
npm run build
```

### Web

```bash
cd web
npm run build
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- ChatGPT for helping me learn JSX

