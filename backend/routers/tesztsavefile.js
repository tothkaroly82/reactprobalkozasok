const express = require('express');
const router = express.Router();
const multer = require('multer')
const cors = require('cors');
// / logging all methods
router.use((req, res, next) => {
    console.log(`${req.method} ${req.url} ${req.body} `);
    next();
    ///console.log("szia szomszed") ez a next utan lefut, a middleware ellenere is, bestpractice next eseten return next()
});

// SET STORAGE
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

const upload = multer({ storage: storage })

router.post('/uploadmultiple', upload.array('files', 2), (req, res, next) => {
    const files = req.files
    if (!files) {
        const error = new Error('Please choose files')
        error.httpStatusCode = 400
        return next(error)
    }

    res.send(files)

})