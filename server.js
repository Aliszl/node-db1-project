const express = require("express");

const db = require("./data/dbConfig.js");

const server = express();
// const router = express.Router();

server.use(express.json());

function getAll() {
  return db.select("id", "name", "budget").from("accounts");
}
function remove(id) {
  //raw sql: delete from accounts where id = 16;
  return db('accounts')
  .delete().where({id}) 
  }

server.get("/", async (req, res) => {
  const accounts = await getAll();
  res.status(200).json({ accounts });
});

function getById(id) {
  // knex('users').where('id', 1)
  // Outputs:
  // select * from `users` where `id` = 1
  //raw sql select * from accounts where id is 12
  // or  select * from accounts where id = 12
  //or select id, name, budget from accounts where id = 13
  return db("accounts").where({ id });
  // .select('id','name','budget')
}

server.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await getById(id);
    res.status(200).json(data[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Fatal error getting account by id" });
  }
});

function insert(account) {
  // raw SQL: insert into accounts (name, budget) values ('hi','there')
  // search the knex docs for "INSERT" knex('accounts').insert({name: 'test name', budget: 'test budget'})
  return db("accounts").insert(account);
}
server.post("/", async (req, res) => {
  try {
    const account = await insert(req.body);
    res.status(200).json(account);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Fatal error posting account" });
  }
});

server.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const account = await remove(id);
    res.status(200).json(account);
  } catch (err) {
    res.status(500).json({ message: "Fatal error deleting account" });
  }
});

module.exports = server;
