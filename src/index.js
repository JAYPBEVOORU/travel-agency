const express = require('express');

const app = new express();

app.get('/places',(request, response)=>{
    response.send(['Bangalore','Mysore']);
});

app.listen(4040,()=>{
    console.log('application started');
})