// server.js
// Task Management System API
// Backend built with Express.js + SQLite

const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// ------------------------------
// 1. CREATE TASK -> POST /tasks
// ------------------------------
app.post('/tasks', (req, res) => {
  const { taskTitle, description, dueDate, status } = req.body;

  if (!taskTitle) {
    return res.status(400).json({ error: 'taskTitle is required' });
  }

  const finalStatus = status || 'Pending';
  if (!['Pending', 'Completed'].includes(finalStatus)) {
    return res.status(400).json({ error: "status must be 'Pending' or 'Completed'" });
  }

  const sql = `INSERT INTO tasks (taskTitle, description, dueDate, status) VALUES (?, ?, ?, ?)`;
  db.run(sql, [taskTitle, description || '', dueDate || '', finalStatus], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(201).json({
      message: 'Task created successfully',
      task: { id: this.lastID, taskTitle, description, dueDate, status: finalStatus }
    });
  });
});

// -----------------------------------------------
// 2. VIEW TASKS -> GET /tasks  (optional ?status=Pending or ?status=Completed)
// -----------------------------------------------
app.get('/tasks', (req, res) => {
  const { status } = req.query;

  if (status) {
    if (!['Pending', 'Completed'].includes(status)) {
      return res.status(400).json({ error: "status filter must be 'Pending' or 'Completed'" });
    }
    return db.all(`SELECT * FROM tasks WHERE status = ?`, [status], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  }

  db.all(`SELECT * FROM tasks`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// ------------------------------
// 3. VIEW ONE TASK -> GET /tasks/:id
// ------------------------------
app.get('/tasks/:id', (req, res) => {
  db.get(`SELECT * FROM tasks WHERE id = ?`, [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Task not found' });
    res.json(row);
  });
});

// -----------------------------------------------------
// 4. UPDATE TASK STATUS (or full update) -> PUT /tasks/:id
// -----------------------------------------------------
app.put('/tasks/:id', (req, res) => {
  const { taskTitle, description, dueDate, status } = req.body;

  if (status && !['Pending', 'Completed'].includes(status)) {
    return res.status(400).json({ error: "status must be 'Pending' or 'Completed'" });
  }

  const sql = `
    UPDATE tasks
    SET taskTitle = ?, description = ?, dueDate = ?, status = ?
    WHERE id = ?
  `;
  db.run(sql, [taskTitle, description, dueDate, status, req.params.id], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task updated successfully' });
  });
});

// ------------------------------
// 5. DELETE TASK -> DELETE /tasks/:id
// ------------------------------
app.delete('/tasks/:id', (req, res) => {
  db.run(`DELETE FROM tasks WHERE id = ?`, [req.params.id], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
