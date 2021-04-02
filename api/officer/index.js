const router = require('express').Router()
const Models = require('../../models')
const {Officers, Owners, Violations} = Models

const uuid = require('uuid')
const moment = require('moment')

router.post('/newofficer', async (req, res) => {
    try{
        console.log(req.body.data)
        let invalids = []
        if((await Owners.find({email:req.body.data.email})).length > 0 || (await Officers.find({email:req.body.data.email})).length > 0) invalids.push('The email is not available.')

        if(invalids.length > 0) return res.json({result:false, invalids})

        let newof = new Officers(req.body.data)
        newof.save()
        res.json({newof, result:true})
    }catch(err){
        console.log(err)
        res.status(400).json({result:false, msg:err})
    }
})

router.get('/officers', async (req, res) => {
    try{
        let officers = await Officers.find({userType:'officer'})
        res.json({officers})
    }catch(err){
        console.log(err)
        res.status(400).json({result:false, msg:err})
    }
})

router.post('/findowner', async (req, res) => {
    try{
        let owner = await Owners.findOne({serial_number:req.body.serial_number})
        if(owner == null){
            return res.json({result:false})
        }

        res.json({owner, result:true})
    }catch(err){
        console.log(err)
        res.json({result:false, msg:err})
    }
})

router.post('/newviolation', async (req, res) => {
    try{
        console.log(req.body)
        let newvio = new Violations(req.body)
        newvio.save()
        res.json({newvio, result:true})
    }catch(err){
        console.log(err)
        res.json({msg:err, result:false})
    }
})


router.post('/mypreviousscan', async (req, res) => {
    try{
        console.log(req.body)
        let violations = await Violations.find({from:req.body._id})
        let ownersID = violations.map(v => v.ownerID)

        let owners = await Owners.find({_id:ownersID})
        
        violations.forEach(vio => vio.owner = owners.find(o => o._id == vio.ownerID))

        return res.json({violations})
    }catch(err){
        console.log(err)
    }
})

router.get('/violations', async (req, res) => {
    try{
        console.log(req.body)
        let violations = await Violations.find()
        let ownersID = violations.map(v => v.ownerID)

        let owners = await Owners.find({_id:ownersID})
        
        violations.forEach(vio => vio.owner = owners.find(o => o._id == vio.ownerID))

        return res.json({violations})
    }catch(err){
        console.log(err)
    }
})


module.exports = router