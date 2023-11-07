const express = require('express');
const Sqlite3 = require('sqlite3');
const db = new Sqlite3.Database(':memory:');

const router = express.Router();

router.get('/', async (req, res) => {
  await db.all('SELECT * FROM users', (err, rows) => {
    res.json(rows ?? []);
  });
});

router.delete('/', async (req, res) => {
  await db.all('DELETE * FROM users', (err, rows) => {
    res.json(rows);
  });
});

module.exports = router;
