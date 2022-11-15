const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
let Claims = new Schema({
  name: {
    type: String
  },
  ClaimNum: {
    type: String
  },
  AgencyNum: {
    type: String
  },
  ID: {
    type: String
  },
  StartDate: {
    type: Date
  },
  contact: {
    type: String
  },
  EndDate: {
    type: Date
  },
  Treatment: {
    type: String
  },
  PolDur: {
    type: String
  },
  PolAmt: {
    type: String
  },
  Eligible: {
    type: String
  },
  ClaimAmt: {
    type: String
  },
  Coverage: {
    type: String
  },
  Premium: {
    type: String
  },
  StatDate: {
    type: Date
  },
  DueAmt: {
    type: String
  },
  Balance: {
    type: String
  },
  DueDate: {
    type: Date
  },
  Payment: {
    type: String
  },
  email: {
    type: String
  }
},
 {
  collection: 'claims'
})
 
module.exports = mongoose.model('Claims', Claims)