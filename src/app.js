// // desafío 3 
const express = require ("express");
const PORT = 8080;
const app = express();

app.get("/", (req, res) =>{
    res.send('<p">"Hola Adrii, otra vez"</p>')
});

app.listen(PORT, ()=> {
    console.log("Server lintening on port 8080")
});