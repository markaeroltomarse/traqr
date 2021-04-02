const router = require('express').Router()



const uuid = require('uuid')
const moment = require('moment')
const { Officers, Owners, Violations } = require('../../models')

router.post('/new', async (req, res) => {
    try{
        console.log(req.body)
        let invalids = []
        if((await Owners.find({email:req.body.email})).length > 0 || (await Officers.find({email:req.body.email})).length > 0) invalids.push('Your email is not available.')
        if((await Owners.find({serial_number:req.body.serial_number})).length > 0) invalids.push('Your serial number is not available. you may report it')

        if(invalids.length > 0) return res.json({result:false, invalids})

        let newowner = new Owners(req.body)
        newowner.save()
        res.json({newowner, result:true})
    }catch(err){
        console.log(err)
        res.status(400).json({result:false, msg:err})
    }
})

router.post('/violations', async (req, res) => {
    console.log(req.body)
    let violations = await Violations.find({ownerID:req.body.ownerID})
    console.log(violations)
    res.json({violations, result:true})
})



module.exports = router