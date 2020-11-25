const express = require('express');
const knex = require('knex');

const db = knex({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'your_database_user',
      password : 'your_database_password',
      database : 'myapp_test'
    }
  });



const app = new express();

app.get("/health", async (request, response) => {
    try {
      const result = await db.select(db.raw('select curdate()'));
      if (!result) {
        return res.status(404).send("DB is Unhealthy!");
      }
      res.send('Healthy');
    } catch (e) {
      console.error(e);
      res.status(500).send("DB is Unhealthy!");
    }
  });


app.get('/places',(request, response)=>{
    response.send(['Bangalore','Mysore']);
});

app.listen(4040,()=>{
    console.log('application started');
})