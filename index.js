const router = require('./routes/Router');
const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.port || 3000;
app.use(router);
app.listen(port,()=>{
    console.log(`Running with port ${port}`)
});