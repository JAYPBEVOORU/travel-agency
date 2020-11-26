const express = require('express');
const knex = require('knex');

const db = knex({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '9916141000@uk',
      database : 'travel'
    }
  });



const app = new express();

app.get("/health", async (request, response) => {
    try {
      const result = await db.select(db.raw('curdate()'));
      if (!result) {
        return response.status(404).send("DB is Unhealthy!");
      }
      console.log(result)
      response.send(result);
    } catch (e) {
      console.error(e);
      response.status(500).send("DB is Unhealthy!");
    }
  });


app.get('/places',async (request, response)=>{
  try {
const result = await db('place')
    console.log(result)
    response.send(result);
  } catch (e) {
    console.error(e);
    response.status(500).send("failed to fetch from place table!");
  }
});
app.get('/users',async (request, response)=>{
try {
  const result = await db('users')
      console.log(result)
      response.send(result);
    } catch (e) {
      console.error(e);
      response.status(500).send("failed to fetch from user table!");
    }
  });

  app.get('/login',async (request, response)=>{
    try {
      const result =  await db('users').where('email',request.query.email);
      if (result.length===0) {
        return response.status(404).send("user not found with this email id!");
      }
          console.log(result)
          response.send(result);
        } catch (e) {
          console.error(e);
          response.status(500).send("users does not exist from email id");
        }
      });

app.listen(3032,()=>{
    console.log('application started');
})