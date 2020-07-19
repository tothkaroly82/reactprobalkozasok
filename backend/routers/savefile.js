const express = require('express');
const router = express.Router();
const multer = require('multer')
const cors = require('cors');
// / logging all methods
router.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
    ///console.log("szia szomszed") ez a next utan lefut, a middleware ellenere is, bestpractice next eseten return next()
});


router.use(cors())
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage }).array('file')

router.get('/', function(req, res) {
    return res.send('Hello Server')
});

router.post('/', function(req, res) {

    upload(req, res, function(err) {

        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
                // A Multer error occurred when uploading.
        } else if (err) {
            return res.status(500).json(err)
                // An unknown error occurred when uploading.
        }

        return res.status(200).send(req.file)
            // Everything went fine.
    })
});
module.exports = router