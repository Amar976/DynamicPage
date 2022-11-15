const {MongoClient, ObjectID} = require('mongodb');
const { default: mongoose } = require('mongoose');

//const dbConfig = require('../configs/db.config');
const helper = require('../utils/helper.util');

mongoose.connect("mongodb+srv://Mithila26:jLyo1W8G6xzHiR6y@cluster0.smmdgs2.mongodb.net/health_care?retryWrites=true&w=majority",{
  useNewUrlParser:true
 // userUnifiedTopology:true,
  //seCreateIndex:true
}).then(()=>{
  console.log('ConnectionDone');
}).catch((e)=>{
  console.log(e);
})

async function add(item) {
    return new Promise(async (resolve, reject) => {
      //const client = new MongoClient(dbConfig.url);
      try {
        //await client.connect();
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
      //const client = new MongoClient(dbConfig.url);
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

    async function update(id, newItem) {
      return new Promise(async (resolve, reject) => {
        //const client = new MongoClient(dbConfig.url);
        try {
          //await client.connect();
          //const db = client.db(dbConfig.dbName);
          const db = client.db();
          const updatedItem = await db.collection('users').findOneAndReplace({ _id: ObjectID(id) }, newItem, { returnOriginal: false });
          resolve(updatedItem.value);
    
          client.close();
        } catch (error) {
          reject(error)
        }
      });
    }

  module.exports = {
    //loadData,
    get,
    //getById,
    add,
    update,
    //remove
  }