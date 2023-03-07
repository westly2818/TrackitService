

async function getDashboardData(req, res, next) {
  try {
    let dashboardData='dashboard api works fine'
    res.send({ status: "success", data: dashboardData })
  }
  catch (err) {
    console.log(err)
  }
};
async function getnames(req, res, next) {
  try {
names=[{'westly':"backendDev"},{'vichu':"backendDev"},{'vibsh':"FrontendDev"},{'sansai':"frontendDev"}]
res.send(names)
  }
  catch (err) {
    console.log(err)
  }
};

module.exports = {
  getDashboardData: getDashboardData,
  getnames:getnames
}
// {
//   "name": "trackit-backend-service",
//   "version": "1.0.0",
//   "description": "Track it backend",
//   "main": "index.js",
//   "scripts": {
//     "test": "echo \"Error: no test specified\" && exit 1",
//     "start": "node server.js"
//   },
//   "author": "westly",
//   "license": "ISC",
//   "dependencies": {
//     "@influxdata/influxdb-client": "^1.12.0",
//     "async": "^3.2.0",
//     "axios": "^0.21.1",
//     "bcryptjs": "^2.4.3",
//     "body-parser": "^1.20.0",
//     "cors": "^2.8.5",
//     "dotenv": "^8.6.0",
//     "express": "^4.18.1",
//     "express-history-api-fallback": "^2.2.1",
//     "fs": "^0.0.1-security",
//     "fs-extra": "^10.0.0",
//     "http": "^0.0.1-security",
//     "influx": "^5.8.0",
//     "jsonwebtoken": "^8.5.1",
//     "knex": "^2.3.0",
//     "lodash": "^4.17.21",
//     "moment": "^2.29.1",
//     "moment-timezone": "^0.5.33",
//     "mongoose": "^5.12.5",
//     "mongoose-unique-validator": "^2.0.3",
//     "mqtt": "^4.2.6",
//     "multer": "^1.4.2",
//     "node-schedule": "^2.1.0",
//     "path": "^0.12.7",
//     "pg": "^8.8.0",
//     "socket.io": "^3.1.1",
//     "sqlite3": "^5.0.2",
//     "web-push": "^3.4.4"
//   }
// }
