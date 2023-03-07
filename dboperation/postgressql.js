// const fs = require('fs');

const postgresConfig = require("../config/config.json")
var dbSession = undefined;

async function getInstance() {
    return new Promise((resolve, reject) => {
        // if (dbSession) {
        //     resolve({ status: "success", instance: dbSession });
        // } else {
        //     dbSession = knex;
        //     resolve({ status: "success", instance: dbSession });
        // }
        let timeout = 90000;
        var knex = require('knex')({
            client: 'pg',
            connection: {
                host: postgresConfig.postsql.host,
                // port: mssqlConfig.port,
                user: postgresConfig.postsql.user,
                password: postgresConfig.postsql.password,
                database: postgresConfig.postsql.database,
                // options: {
                //     connectionTimeout: timeout,
                //     requestTimeout: timeout,
                //     encrypt: false 
                // },
                pool: {
                    max: 7,
                    min: 3,
                    acquireTimeout: timeout
                }
            }
        });
        resolve({ status: "success", instance: knex });
    });
}

async function runQuery(instance,queryParams) {
    return new Promise(async (resolve, reject) => {
        try {
            let qryResult = await instance.raw(queryParams.query, queryParams.params);
            let qryResponse = { status: "success" };
            if(qryResult.rows) qryResponse.data = qryResult.rows;
            resolve(qryResponse)
        } catch (err) {
            console.log(err);
            resolve({ status: "failure", message: err.toString() })
        }
    });
}

async function batchInsert(instance,tableName, insertData, chunkSize) {
    return new Promise(async (resolve, reject) => {
        try {
            let qryResult = await instance.batchInsert(tableName, insertData, chunkSize).returning('*');
            resolve({ status: "success" });
        } catch (err) {
            console.log(err);
            resolve({ status: "failure", message: err.toString() })
        }
    });
}

module.exports = {
    getInstance,
    batchInsert,
    runQuery
}