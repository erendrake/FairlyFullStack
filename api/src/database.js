const sqlite3 = require('sqlite3').verbose();

const databaseName = 'database.sqlite';

// Connect to the SQLite database
const db = new sqlite3.Database(databaseName, (err) => {
  if (err) {
    console.error(`Error opening database ${err.message}`);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Wrap SQLite operations in Promises for easier use with async/await
const query = (sql, params = []) => new Promise((resolve, reject) => {
  db.all(sql, params, (err, rows) => {
    if (err) {
      reject(err);
    } else {
      resolve(rows);
    }
  });
});

const run = (sql, params = []) => new Promise((resolve, reject) => {
  db.run(sql, params, function handleCallback(err) {
    if (err) {
      reject(err);
    } else {
      resolve({ id: this.lastID });
    }
  });
});

const beginTransaction = () => run('BEGIN TRANSACTION');

const commit = () => run('COMMIT');

const rollback = () => run('ROLLBACK');

module.exports = {
  databaseName,
  query,
  run,
  beginTransaction,
  commit,
  rollback,
  db, // Export the db object in case direct access is needed elsewhere
};
