const https = require('https');
const fs = require('fs');
const router_cbc = require('./CBC/routes/Router');
const router_aqa = require('./AQS/routes/Router'); // تأكد من تصحيح المسار إذا كان مختلفًا
const express = require("express");
var compression = require('compression');
const cors = require("cors");
const os = require('os');
const app = express();
app.use(cors());
app.use(compression());
app.use(express.json());

const port = process.env.PORT || 3000;


const networkInterfaces = os.networkInterfaces();

let ip;
for (let interface of Object.keys(networkInterfaces)) {
  for (let interfaceInfo of networkInterfaces[interface]) {
    if (interfaceInfo.family === 'IPv4' && !interfaceInfo.internal) {
      ip = interfaceInfo.address;
      break;
    }
  }
  if (ip) {
    break;
  }
}

app.use('/cbc/api/v1/', router_cbc);
app.use('/aqs/api/v1/', router_aqa);
app.use('/uploads', express.static('uploads'));

// إنشاء خادم HTTPS
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})








