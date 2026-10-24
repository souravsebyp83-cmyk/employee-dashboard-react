# PeopleDesk — Employee Dashboard

A beginner-friendly React assignment project built with Vite, React Router, Lucide icons, and custom CSS.

## Features
- Responsive navbar with **Home** and **Employee Form** routes.
- Home dashboard fetches users from `https://jsonplaceholder.typicode.com/users`.
- Employee directory shows **ID, Name, and Email** in a searchable table.
- Employee form includes **Name, Designation, Location, and Salary**.
- Client-side required-field validation. The form does **not** POST data, as required by the assignment.
- Loading and API error states.

## Run locally
1. Install Node.js (LTS) from https://nodejs.org/
2. Extract this folder and open a terminal in it.
3. Run:
   ```bash
   npm install
   npm run dev
   ```
4. Open the local URL printed by Vite (usually `http://localhost:5173`).

## Routes
- `/` — Home / Employee Dashboard
- `/employee-form` — Employee Form

## Publish on GitHub
1. Create a new repository on https://github.com/new (for example, `employee-dashboard`).
2. Open a terminal in this project folder and run:
   ```bash
   git init
   git add .
   git commit -m "Create employee dashboard with React"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/employee-dashboard.git
   git push -u origin main
   ```
3. Replace `YOUR-USERNAME` with your GitHub username. Submit the repository URL shown on GitHub.

## Notes
JSONPlaceholder is a demo API. Its users are sample records, not real employee data. The form intentionally does not send data to a server.
