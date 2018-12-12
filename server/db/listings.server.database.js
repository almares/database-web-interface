var sqlite3 = require('sqlite3').verbose();

var db = './server/db/flowers.db'

// open database in memory
var Database = new sqlite3.Database(db, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the flowers database.');
});

module.exports = Database;
