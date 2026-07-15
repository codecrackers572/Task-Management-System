// database.js
// Sets up the SQLite database and the "tasks" table.

const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');
const os = require('os');

function getWritableDbPath(filename) {
  const preferredPath = path.join(__dirname, filename);
  try {
    // Test if we can actually write in this directory
    const testFile = path.join(__dirname, '.write_test');
    fs.writeFileSync(testFile, 'test');
    fs.unlinkSync(testFile);
    if (!fs.existsSync(preferredPath)) {
      fs.writeFileSync(preferredPath, '');
    }
    fs.chmodSync(preferredPath, 0o666);
    return preferredPath;
  } catch (err) {
    // Local folder isn't writable (happens on some hosting environments) -
    // fall back to the OS temp directory, which is always writable.
    console.warn(`Project folder not writable, using temp directory instead: ${err.message}`);
    const fallbackPath = path.join(os.tmpdir(), filename);
    if (!fs.existsSync(fallbackPath)) {
      fs.writeFileSync(fallbackPath, '');
    }
    fs.chmodSync(fallbackPath, 0o666);
    return fallbackPath;
  }
}

const DB_PATH = getWritableDbPath('tasks.db');
console.log('Using database file at:', DB_PATH);

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database (tasks.db)');
  }
});

// Create the tasks table if it doesn't already exist
db.run(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    taskTitle TEXT NOT NULL,
    description TEXT,
    dueDate TEXT,
    status TEXT NOT NULL DEFAULT 'Pending' CHECK(status IN ('Pending', 'Completed'))
  )
`, (err) => {
  if (err) {
    console.error('Error creating table:', err.message);
  } else {
    console.log('Tasks table ready.');
  }
});

module.exports = db;
