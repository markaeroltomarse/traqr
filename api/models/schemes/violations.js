const mongoose = require('mongoose')
const moment = require('moment')

const uuid = require('uuid').v4()

let today = moment().format('MMMM Do YYYY, h:mm:ss a');
let yesterday =  moment().subtract(1, "days").format('MMMM Do YYYY, h:mm:ss a') - 1;

const Schema = mongoose.Schema

let Violations = new Schema({
    ownerID:{
        type:String,
        required:true,
    },
    owner:{
        required:false,
        type:Object
    },
    penalty:{
        type:Number,
        required:true
    },
    violation_code:{
        required:true,
        type:String,
    },
    from:{
        type:String,
        required:true
    },
    created:{
        type:String,
        default:today
    },

}, {strict:false})


module.exports = mongoose.models.tra_violations || mongoose.model('tra_violations', Violations)

