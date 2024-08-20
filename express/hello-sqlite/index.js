const express = require("express");

const sqlite = require("sqlite3");
const db = new sqlite.Database("Users.db", (err) => {
  if (err) {
    console.erro(err);
    process.exit(1);
  } else {
    console.log("Connected to the SQLite database.");
    db.run(
      `CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name TEXT NOT NULL,
            email TEXT UNIQUE,
            password TEXT NOT NULL, 
            CONSTRAINT email_unique UNIQUE(email)
        )
        
        `,
      (err) => {
        if (err) {
          console.error(err, "TABLE Exists");
        }
      }
    );
  }
});
// create a db within the current working directory.

const app = express();
app.listen(8080, () => {
  console.log("Server started on port 8080");
});

app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

app.get("/users", (req, res) => {
  db.all(`SELECT * FROM user`, [], (err, rows) => {
    // if(err) {
    //     res.
    // }
  });
});

app.use((req, res) => {
  res.status(404).send("Not found");
});

// it is going to update every field where every field the null parameter

// arrow functions bind the top level this. into their scope

// in a function, the this. is in the inner scope of that function

// not found or has been deleted. what shall we give to the son of maria, what shall we give to that beautiful boy
// bunches of grapes we should give to the incesense
