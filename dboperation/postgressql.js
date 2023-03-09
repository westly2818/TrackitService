// const fs = require('fs');

const { query } = require('express');
const { get } = require('http');
const moment=require('moment')

  
var pg = require("pg");

async function insertData(querydata){
    return new Promise(async(resolve, reject) => {
        var client = new pg.Client({
            user: "westly",
            password: "i7H9Hfr8VODmX5tzOVu71PfTlbFdTc7U",
            database: "dailydata",
            port: 5432,
            host: "dpg-cg3q8sbhp8u5r9f3ljf0-a.oregon-postgres.render.com",
            ssl: true
          });
        await client.connect();

      await client.query(`${querydata.query}`, querydata.params, function (err, result){ //Delete a record in de db
        if(err){
            client.end();
            reject(err)
        }
        else{
          client.end();
          
        }
      });
      console.log('inserted successfully')
      resolve({'status':'successfully inserted'})
    })
}
async function queryData(query){
return new Promise(async(resolve, reject) => {
    var client = new pg.Client({
        user: "westly",
        password: "i7H9Hfr8VODmX5tzOVu71PfTlbFdTc7U",
        database: "dailydata",
        port: 5432,
        host: "dpg-cg3q8sbhp8u5r9f3ljf0-a.oregon-postgres.render.com",
        ssl: true
      });
    await client.connect();
    await client.query(`${query.query}`, query.params, function (err, result){ 
        if(err){
            client.end();
            reject(err)
        }
        else{
            resolve({"data":result.rows,"status":"success"}) 
          client.end();
          
        }
      });
     

})
 
  }


  // insert query================
  let today=moment().subtract(50,'minute').format('YYYY-MM-DD HH:mm:ss')
let ins = {
    "query": `INSERT INTO milkdata (morning_litre,evening_litre,timestamp) values($1,$2,$3)`,
    "params": [4,0,moment().subtract(80,'minutes').toDate()]
  }

  let createTable={
    "query":`CREATE SEQUENCE milkdata_id_seq;
    CREATE TABLE milkdata
    (
       id INT NOT NULL DEFAULT NEXTVAL('milkdata_id_seq'),
       morning_litre DECIMAL,
       evening_litre DECIMAL,
       timestamp timestamp
    );`,
    "params":[]
  }

  let update={
    "query": `UPDATE  milkdata SET morning_litre=$1 where id=$2 `,
    "params": [0,2]
  }
  let del={
    "query": `DELETE FROM milkdata where id=13 `,
    "params": []
  }
//  insertData(del)

  // select query================
  let id=moment().subtract(29,'minute').format('YYYY-MM-DD HH:mm:ss')
let getdata={
    "query": `select * from morning_data where timestamp > '${id}'`,
    "params": []
}



module.exports = {
    queryData:queryData,
insertData:insertData
}