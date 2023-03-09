const mongoose = require('mongoose')
const moment = require('moment')

const uuid = require('uuid').v4()

let today = moment().format('MMMM Do YYYY, h:mm:ss a');
let yesterday =  moment().subtract(1, "days").format('MMMM Do YYYY, h:mm:ss a') - 1;

const Schema = mongoose.Schema

let Owners = new Schema({
    fname:{
        type:String,
        required:true,
        length:25,
        lowercase:true,
    },
    lname:{
        type:String,
        required:true,
        length:25,
        lowercase:true,
    },

    mname:{
        type:String,
        required:true,
        length:25,
        lowercase:true,
    },

    email:{
        type:String,
        required:true,
        length:25,
        lowercase:true,
    },

    password:{
        type:String,
        required:true,
        length:25
    },

    address:{
        type:String,
        required:true,
        length:25 
    },

    v_category:{
        type:String,
        required:true,
        length:25 
    },

    plate_number:{
        required:true,
        type:Number,
    },

    serial_number:{
        required:true,
        type:Number,
    },

    type_fuel:{
        required:true,
        type:String,
    },

    type_body:{
        required:true,
        type:String,
    },

    series:{
        type:String,
        required:true,
    },

    color:{
        type:String,
        required:true,
    },

    userType:{
        type:String,

        default:'owner'
    },

    gender:{
        type:String,
        required:true,
        length:10
    },

    birthday:{
        type:String,
        required:false,
    },
    
    
    created:{
        type:String,
        default:today
    },

    driverlicenseimg:{
        type:String,
        required:true
    },

    images:{
        photos:{
            type:[String],
            required:false
        },
        profile:{
            type:String,
            required:false,
            default:''
        },
    },

    approved:{
        type:Boolean,
        require:false,
        default:false,
    }

    
}, {strict:false})


module.exports = mongoose.models.tra_owners ||mongoose.model('tra_owners', Owners)

