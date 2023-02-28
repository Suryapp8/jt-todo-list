const express = require("express");
const { collection } = require("./mongoose");
const Todo = require("./todo");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", cors(), (req, res) => {});

//getting data from login page
app.post("/", async (req, res) => {
  const { email, password } = req.body;
  //checking user already exist or not
  try {
    const checkUser = await collection.findOne({ email: email });
    if (checkUser) {
      res.json("exist");
    } else {
      res.json("notexist");
    }
  } catch (e) {
    console.log(e);
  }
});

//code for signup page
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const data = {
    email: email,
    password: password,
  };
  try {
    const checkUser = await collection.findOne({ email: email });
    if (checkUser) {
      res.json("exist");
    } else {
      res.json("notexist");
      await collection.insertMany([data]);
    }
  } catch (e) {
    console.log(e);
  }
});

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todo/new", (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });
  todo.save();
  res.json(todo);
});

//deleting the item
app.delete("/todo/delete/:id", async (req, res) => {
  const result = await Todo.findOneAndDelete(req.params.id);

  res.json({ result });
});

app.get("/todo/complete/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  todo.complete = !todo.complete;

  todo.save();

  res.json(todo);
});

app.put("/todo/update/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  todo.text = req.body.text;

  todo.save();

  res.json(todo);
});

app.listen(8000, () => {
  console.log("port is running");
});
