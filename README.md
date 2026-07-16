# Task Management System API

Backend Development Internship — Task 2

## What this is
A REST API built with **Express.js** and **SQLite** to manage tasks (create, view, update, delete), with optional filtering by status, plus a simple HTML frontend to display and manage them.

## Fields
- Task Title
- Description
- Due Date
- Status (Pending / Completed)

## Endpoints
| Method | Endpoint              | Description                          |
|--------|-----------------------|----------------------------------------|
| POST   | /tasks                | Create a new task                     |
| GET    | /tasks                | View all tasks                        |
| GET    | /tasks?status=Pending | View tasks filtered by status         |
| GET    | /tasks/:id            | View one task                         |
| PUT    | /tasks/:id            | Update a task (including status)      |
| DELETE | /tasks/:id            | Delete a task                         |

## Tech Stack
- Node.js
- Express.js
- SQLite

## How to run (on Replit)
1. Import this folder into a new Replit Node.js repl.
2. Replit auto-installs dependencies from `package.json`. If not, run: `npm install`
3. Click **Run**, or type: `node server.js`
4. Visit the Replit URL in a browser to see the frontend page listing tasks.

## How to test with Postman
1. Import `postman_collection.json` into Postman.
2. Set the `base_url` variable to your Replit URL.
3. Run each request: Create Task, View All Tasks, View Tasks Filtered by Status, View Single Task, Update Task, Delete Task.

## Database
Uses SQLite — data is stored in a file called `tasks.db`, created automatically the first time the server runs.

## Project Report
See `PROJECT_REPORT.md` for a full write-up of the objective, design, and learning outcomes.
