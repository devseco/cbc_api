const router_cbc = require('./CBC/routes/Router');
const router_aqa = require('./CBC/routes/Router');
const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.port || 3000;
app.use('/cbc/api/v1/',router_cbc);
app.use('/aqs/api/v1/',router_aqa);
app.listen(port,()=>{
    console.log(`Running with port ${port}`)
});