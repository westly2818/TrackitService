const db = require("../dboperation/postgressql");
const moment=require('moment')

async function insertDailydata(req, res, next) {
  try {
    let ins = {
      "query": `INSERT INTO morning_data (litre,timestamp) values($1,$2)`,
      "params": [req.body.litre,moment().toDate()]
    }
db.insertData(ins)
res.send({ status: "successfully inserted the data", })
   console.log('inserted morndata')
  }
  catch (err) {
    console.log(err)
  }
};
async function getdata(req, res, next) {
  try {
    let getdata={
      "query": `select * from morning_data `,
      "params": []
  }
let data=await db.queryData(getdata)  
res.send({ status: "success", data: data })
return data
  }
  catch (err) {
    console.log(err)
  }
};

module.exports = {
  insertDailydata: insertDailydata,
  getdata:getdata
}
