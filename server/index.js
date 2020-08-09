const express = require("express");
const app = express();
const pool = require("./db");
const bodyParser = require("body-parser");
const Pool = require("pg").Pool;
// pg.connect("postgres://postgres:admin@localhost:5432/index");

app.use(express.json()); // =>req.body
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PATCH, PUT, POST, GET, DELETE, OPTIONS')
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// const pgPool = new Pool(pgConfig);
// app.use(bodyParser.json());
// //naujiena, jei neveiks kažkas bus to kaltė body parserio:
// const pgPool = new Pool();
// async function connect() {
//   for (let nRetry = 1; ; nRetry++) {
//     try {
//       const client = await pgPool.connect();
//       if (nRetry > 1) {
//         console.info("Now successfully connected to Postgres");
//       }
//       return client;
//     } catch (e) {
//       if (e.toString().includes("ECONNREFUSED") && nRetry < 5) {
//         console.info(
//           "ECONNREFUSED connecting to Postgres, " +
//             "maybe container is not ready yet, will retry " +
//             nRetry
//         );
//         // Wait 1 second
//         await new Promise((resolve) => setTimeout(resolve, 1000));
//       } else {
//         throw e;
//       }
//     }
//   }
// }
// connect();
// //Routes

//get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo
app.get("/", (req, res) => {
  res.json("Works on /");
});

app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
// //

app.post("/api/console", (req, res) => {
  res.send(req.body);
});

//create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING *",
      [description]
    );
    console.log(req.body);
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params; // where
    const { description } = req.body; // set
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json("Todo was updated");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("Todo was successfully deleted");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000);
