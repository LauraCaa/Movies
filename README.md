# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Movies
A web application built with **React**, **React Router**, and **Redux** that allows users to explore movies, manage authentication, and access protected routes.

## 🚀 Features
- 🔐 User authentication (login and register)
- 🎥 Movie listing and details
- 🔒 Protected routes for logged-in users
- 🌐 Routing with `react-router-dom`
- 🧠 Global state management with Redux
- 💅 Responsive and clean UI

## 🛠️ Tech Stack
- React
- React Router
- Redux
- JavaScript
- CSS

## 📂 Project Structure
src/
├── components/ # Reusable UI components
├── pages/ # Route pages (Home, Login, Register, etc.)
├── redux/ # Redux actions, reducers and store
├── App.js # Main application logic and routes
├── index.js # Entry point

## 🧪 How to Run Locally
1. Clone the repository:
```bash
git clone https://github.com/your-username/movie-app.git

2. Navigate to the project folder:
cd movie-app
3. Install dependencies:
npm install
4. Start the development server:
npm run dev
