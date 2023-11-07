const sqlite3 = require('sqlite3');
const databaseName = 'database.sqlite';

const db = new sqlite3.Database(databaseName, sqlite3.OPEN_READWRITE, async (err) => {
  if (err && err.code === 'SQLITE_CANTOPEN') {
    const newdb = new sqlite3.Database(databaseName, async (innerErr) => {
      if (innerErr) {
        console.log(`Getting new database error ${innerErr}`);
      }
      console.log('database init');
      await newdb.exec(`CREATE TABLE stands (id INTEGER PRIMARY KEY, name TEXT, address TEXT);
        CREATE TABLE standAmenities (id INTEGER PRIMARY KEY, description TEXT, StandId INTEGER, FOREIGN KEY(StandId) references stands(id));
        INSERT INTO stands (name, address) VALUES ('Worlds Best Corndogs', '4925 N Glenwood St, Garden City, ID 83714');
        INSERT INTO standAmenities (StandId, description) VALUES (1, 'seating available');
        INSERT INTO stands (name, address) VALUES ('Scottys Hotdogs', 'Mobile Truck');
        INSERT INTO standAmenities (StandId, description) VALUES (2, 'vegan/vegetarian options');
        INSERT INTO stands (name, address) VALUES ('The Rusty Dog', 'Mobile Truck');
        INSERT INTO standAmenities (StandId, description) VALUES (3, 'seating available');
        INSERT INTO standAmenities (StandId, description) VALUES (3, 'condiments');`);
    });
  } else if (err) {
    console.log(`Getting error ${err}`);
  }
});

async function initialize(req, res, next) {
  let initializedDatabase = false;
  if (!initializedDatabase) {
    await db.exec('SELECT 1');
    initializedDatabase = true;
  }
  next();
}

module.exports = {
  initialize,
};
