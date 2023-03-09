const db = require("../dboperation/postgressql");
const moment=require('moment')

async function insertDailydata(req, res, next) {
  try {

   let requestData=req.body
// if(requestData.time=='morning'){
  let today=moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')
  // let today=moment().subtract(50,'minute').format('YYYY-MM-DD HH:mm:ss')

  let getquery={
    "query": `select * from milkdata where timestamp > '${today}'`,
    "params": []
  }
  let result=await db.queryData(getquery)
  if(result.data && result.data.length>0){

    if(result.data[0].morning_litre===null){
      let update={
        "query": `UPDATE  milkdata SET morning_litre=$1 where id=$2 `,
        "params": [requestData.litre,result.data[0].id]
      }
      await db.insertData(update)
    }
    else{
      let update={
        "query": `UPDATE  milkdata SET evening_litre=$1 where id=$2 `,
        "params": [requestData.litre,result.data[0].id]
      }
      await db.insertData(update)
    }
  
    res.send({ status: "success", message:"successfully updated the data"})
}
else{
  let ins = {
    "query": `INSERT INTO milkdata (morning_litre,evening_litre,timestamp) values($1,$2,$3)`,
    "params": [requestData.litre,null,moment().toDate()]
  }
  await db.insertData(ins)
  res.send({ status: "success", message:"successfully inserted the data"})
}
// }
// if(requestData.time=='evening'){
//   let today=moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')
// let getquery={
//   "query": `select * from milkdata where timestamp > '${today}'`,
//   "params": []
// }
// let result=await db.queryData(getquery)
// if(result.data && result.data.length>0){
//   let update={
//     "query": `UPDATE  milkdata SET evening_litre=$1 where id=$2 `,
//     "params": [requestData.litre,result.data[0].id]
//   }
//   await db.insertData(update)
// }
// else{
//   let ins = {
//     "query": `INSERT INTO milkdata (morning_litre,evening_litre,timestamp) values($1,$2,$3)`,
//     "params": [0,requestData.litre,moment().toDate()]
//   }
//   await db.insertData(ins)
// }


// }
 

   console.log('inserted morndata')
  }
  catch (err) {
    console.log(err)
  }
};
async function getdata(req, res, next) {
  try {
    let getdata={
      "query": `select * from milkdata where timestamp>= $1 and timestamp<= $2`,
      "params": [moment(req.body.startDate).toDate(),moment(req.body.endDate).toDate()]
  }
let data=await db.queryData(getdata)  
res.send({ status: "success", data: data.data })
  }
  catch (err) {
    console.log(err)
  }
};

module.exports = {
  insertDailydata: insertDailydata,
  getdata:getdata
}
