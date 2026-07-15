# Project Report: Task Management System API

**Internship:** Backend Development Internship
**Task:** Task 2 – Task Management System
**Tech Stack:** Node.js, Express.js, SQLite

## Objective
The goal of this task was to learn and apply CRUD (Create, Read, Update, Delete) operations
and backend logic by building a Task Management System API.

## What Was Built
A RESTful API using Express.js, backed by an SQLite database, that manages tasks with the
following fields: Task Title, Description, Due Date, and Status (Pending/Completed).

## API Endpoints
| Method | Endpoint             | Purpose                          |
|--------|----------------------|-----------------------------------|
| POST   | /tasks                | Create a new task                |
| GET    | /tasks                | View all tasks                   |
| GET    | /tasks?status=Pending | View tasks filtered by status    |
| GET    | /tasks/:id             | View a single task by ID         |
| PUT    | /tasks/:id             | Update a task (including status) |
| DELETE | /tasks/:id             | Delete a task                    |

## Database Design
A single `tasks` table was created in SQLite with the following schema:
- `id` (auto-incrementing primary key)
- `taskTitle` (required text field)
- `description` (optional text field)
- `dueDate` (text field, stored as date string)
- `status` (restricted to 'Pending' or 'Completed', defaults to 'Pending')

## Key Features
- Full CRUD functionality for task management.
- Status validation ensures only 'Pending' or 'Completed' values are accepted.
- Optional status filtering, allowing users to fetch only pending or only completed tasks.
- A simple frontend page to add, view, filter, toggle status, and delete tasks without
  needing a separate API client.

## Testing
All endpoints were tested using Postman, sending requests for creating, retrieving,
updating, and deleting tasks, and confirming correct responses and status codes.
Screenshots of these tests are included in the submission.

## Learning Outcomes
This task reinforced understanding of REST API design, connecting a backend to a
persistent database, validating input data, and implementing simple query-based
filtering — all foundational skills for backend development.
