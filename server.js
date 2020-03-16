const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();
const router = express.Router();

server.use(express.json());

function getAll() {
        return db
      .select('id', 'name', 'budget')
      .from('accounts')
      
  }

router.get("/api", async(req, res) =>{
    const accounts = await getAll();
    res.status(200).json({ accounts});

}

)

function getById(id) {
// knex('users').where('id', 1)
// Outputs:
// select * from `users` where `id` = 1
    //raw sql select * from accounts where id is 12
    // or  select * from accounts where id = 12
    //or select id, name, budget from accounts where id = 13
    return db('accounts')
    .where({id})
    // .select('id','name','budget') 
  }

  router.get('/:id', async (req, res) => {
      const {id} = req.params
    try {
       
      const data = await getById(id)
     
        res.status(200).json(data)
      
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: 'Fatal error getting account by id' })
    }
  })
  

module.exports = server;