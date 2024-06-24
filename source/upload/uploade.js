const multer = require("multer")

const lagerung = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, "./Public")
    },
    filename : (req, file, cb)=>{cb(null, Date.now() + "_"+ file.originalname)}
})

const uploaden = multer({storage:lagerung})

module.exports = {uploaden}