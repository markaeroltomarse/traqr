const router = require('express').Router()


const multer = require('multer')
const uuid = require('uuid')
const moment = require('moment')
const { Officers, Owners, Violations } = require('../../models')
const path = require('path')



function upload(filename){
    
    let storage = multer.diskStorage({
        destination: function (req, file, cb) {           
          cb(null, `./assets/uploads/`) // 
        },
        filename: function (req, file, cb) {
            console.log(file)
            cb(null, filename + path.extname(file.originalname)) //Appending extension
        }
    })
    
    //Multer middleware config
    return multer({ storage: storage})
}



router.post('/new', async (req, res) => {
    try{
       
        console.log(req.body)
        let invalids = []
        if((await Owners.find({email:req.body.email})).length > 0 || (await Officers.find({email:req.body.email})).length > 0) invalids.push('Your email is not available.')
        if((await Owners.find({serial_number:req.body.serial_number})).length > 0) invalids.push('Your serial number is not available. you may report it')

        if(invalids.length > 0) return res.json({result:false, invalids})
        const filename = uuid.v4()
        req.body.driverlicenseimg = filename + req.body.driverlicenseimg
        let newowner = new Owners(req.body)
        newowner.save()

        //upload().single('licenseimg')
        res.json({newowner, result:true, filename})
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




//SINGE FILE UPLOAD ROUTES
router.post('/singleupload',  async (req, res) => {
    let invalids = []
    const filename = req.query.filename
    
    try{
        upload(filename).single('licenseimg')(req, res, (error) => {
            if (error) {
                console.log(error)
                invalids.push(`File upload error: ${error}`)
                return res.status(500).json({invalids, result:false});
            }
            
            res.status(200).json({msg:'File uploaded', filename, result:true})
        // code
        })
    
        return
    }catch(error){
        console.log(error)
        invalids.push(`File upload error: ${error}`)
        return res.status(500).json({invalids, result:false});
    }
    
})



module.exports = router