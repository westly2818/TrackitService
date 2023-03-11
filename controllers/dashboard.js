const db = require("../dboperation/postgressql");
const moment = require('moment');
const { response } = require("../app");

async function insertDailydata(req, res, next) {
  try {

    let requestData = req.body
    if(requestData.expenses){
      let ins = {
        "query": `INSERT INTO expenses (amount,timestamp) values($1,$2)`,
        "params": [requestData.amount, moment().toDate()]
      }
      await db.insertData(ins).then(response => {
        if (response.status === 'success') {
          res.send({ status: "success", message: "successfully inserted the expense data" })
        }
      })
    }
   else if(req.body.customInsert){
      let getquery = {
        "query": `select * from milkdata where timestamp > '${requestData.startDate}' and timestamp <  '${requestData.endDate}'`,
        "params": []
      }
      let result = await db.queryData(getquery)
      if(result.data && result.data.length > 0){
        if(requestData.mornLitre !=null && requestData.eveningLitre ==null){
          let update = {
            "query": `UPDATE  milkdata SET morning_litre=$1 where id=$2 `,
            "params": [requestData.mornLitre, result.data[0].id]
          }
          await db.insertData(update).then(response => {
            if (response.status === 'success') {
              res.send({ status: "success", message: "successfully updated the data" })
            }
          })
        }
        else if(requestData.mornLitre ==null && requestData.eveningLitre !=null){
          let update = {
            "query": `UPDATE  milkdata SET evening_litre=$1 where id=$2 `,
            "params": [requestData.eveningLitre, result.data[0].id]
          }
          await db.insertData(update).then(response => {
            if (response.status === 'success') {
              res.send({ status: "success", message: "successfully updated the data" })
            }
          })
        }
      }
      else{
        let ins = {
          "query": `INSERT INTO milkdata (morning_litre,evening_litre,timestamp) values($1,$2,$3)`,
          "params": [requestData.mornLitre, requestData.eveningLitre, moment().toDate()]
        }
        await db.insertData(ins).then(response => {
          if (response.status === 'success') {
            res.send({ status: "success", message: "successfully inserted the data" })
          }
        })
  
      }
    }else
    {
    let today = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')
    // let today=moment().subtract(50,'minute').format('YYYY-MM-DD HH:mm:ss')

    let getquery = {
      "query": `select * from milkdata where timestamp > '${today}'`,
      "params": []
    }
    let result = await db.queryData(getquery)
    if (result.data && result.data.length > 0) {

      if (result.data[0].morning_litre === null) {
        let update = {
          "query": `UPDATE  milkdata SET morning_litre=$1 where id=$2 `,
          "params": [requestData.litre, result.data[0].id]
        }
        await db.insertData(update).then(response => {
          if (response.status === 'success') {
            res.send({ status: "success", message: "successfully updated the data" })
          }
        })
      }
      else {
        let update = {
          "query": `UPDATE  milkdata SET evening_litre=$1 where id=$2 `,
          "params": [requestData.litre, result.data[0].id]
        }
        await db.insertData(update).then(response => {
          if (response.status === 'success') {
            res.send({ status: "success", message: "successfully updated the data" })
          }
        })
      }


    }
    else {
      let ins = {
        "query": `INSERT INTO milkdata (morning_litre,evening_litre,timestamp) values($1,$2,$3)`,
        "params": [requestData.litre, null, moment().toDate()]
      }
      await db.insertData(ins).then(response => {
        if (response.status === 'success') {
          res.send({ status: "success", message: "successfully inserted the data" })
        }
      })

    }

    console.log('inserted morndata')
  }
  }
  catch (err) {
    console.log(err)
  }
};
async function getdata(req, res, next) {
  try {
if(req.body.expenses){
  let getdata = {
    "query": `select * from expenses where timestamp>= $1 and timestamp<= $2`,
    "params": [moment(req.body.startDate).toDate(), moment(req.body.endDate).toDate()]
  }
  let data = await db.queryData(getdata)
  res.send({ status: "success", data: data.data })
}
else{
  let getdata = {
    "query": `select * from milkdata where timestamp>= $1 and timestamp<= $2`,
    "params": [moment(req.body.startDate).toDate(), moment(req.body.endDate).toDate()]
  }
  let data = await db.queryData(getdata)
  res.send({ status: "success", data: data.data })
}
    
  }
  catch (err) {
    console.log(err)
  }
};

async function deleteData(req,res){
  try{
    if(req.body.time){
    let timing=req.body.time
    let id=req.body.id
      let update = {
        "query": `UPDATE  milkdata SET ${timing}=$1 where id=$2 `,
        "params": [null,id]
      }
      await db.insertData(update).then(response => {
        if (response.status === 'success') {
          res.send({ status: "success", message: "successfully deleted the data" })
        }
      })
    }
    else
    {
      res.send({"status":"failed please send the input"})
    }
  
  }
  catch(err){
    console.log(err);
  }
}


module.exports = {
  insertDailydata: insertDailydata,
  getdata: getdata,
  deleteData:deleteData
  
}
