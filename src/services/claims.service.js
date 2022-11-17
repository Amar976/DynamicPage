const {MongoClient, ObjectID} = require('mongodb');
//const { default: mongoose } = require('mongoose');
//const Claims = require('../DynamicPage/src/models/claims');

const dbConfig = require('../configs/db.config');
const helper = require('../utils/helper.util');

async function add(item) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(dbConfig.url);
      try {
        await client.connect();
        const db = client.db();
  
        const addedItem = await db.collection('claims').insertOne(item);
  
        resolve(addedItem.ops[0]);
        //client.close();
      } catch (error) {
        reject(error)
      }
    });
  
  }

  async function get(query, limit) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(dbConfig.url);
      try {
        await client.connect();
        const db = client.db();
  
        const items = db.collection('claims').find(query);
  
        if (limit > 0) {
          items = items.limit(limit);
        }
        resolve(await items.toArray());
        client.close();
      } catch (error) {
        reject(error)
      }
  
    });}

    async function update(emailval, claimsDetails) {
      return new Promise(async (resolve, reject) => {
        const client = new MongoClient(dbConfig.url);
        try {
    
          await client.connect();
          const db = client.db(dbConfig.dbName);  
            
         
          const filter = { email: emailval };
          const opts = { upsert:true, new: false };
          console.log(filter)
          const updatedItem = await db.collection('users').findOneAndUpdate(filter,{$set:{claimsDetail:claimsDetails}},opts);
                          
          console.log('updated item',updatedItem);
          resolve(updatedItem.value);
          console.log('updated item value',updatedItem.value);
    
          //client.close();
        } catch (error) {
          reject(error)
        }
      });
    }

    
async function getById(email) {
  return new Promise(async (resolve, reject) => {
    const client = new MongoClient(dbConfig.url);
    try {
      await client.connect();
      const db = client.db(dbConfig.dbName);
      //const db = client.db();
      const item = await db.collection('users').findOne({ email });
      resolve(item);
      client.close();
    } catch (error) {
      reject(error)
    }
  });

}

  module.exports = {
    //loadData,
    get,
    getById,
    add,
    update,
    //remove
  }
