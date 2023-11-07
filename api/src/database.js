const Sqlite3 = require('sqlite3');
const db = new Sqlite3.Database('database.sqlite');

async function tableExists(tableName) {
  if (tableName == null || db == null) {
    return false;
  }

  db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`, 'tb1', (err, row) => {
    console.log(row);
  });

  return true;
}

async function initialize(req, res, next) {
  let initializedDatabase = false;

  if (!initializedDatabase) {
    if (!await tableExists('users')) {
      console.log('database init');
      await db.exec('CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)');
      await db.run('INSERT INTO users (name, email) VALUES ("John Doe", "johndoe@example.com")');
    }

    initializedDatabase = true;
  }
  next();
}

module.exports = {
  initialize,
};
