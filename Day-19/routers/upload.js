
const express = require ('express');
const fileupload = require('express-fileupload');
const router = express.Router();

router.use((req, res, next) => {
    console.log('Upload router middleware!');
    next();
});

router.use(
    fileupload({    
        //Max file size 10MB
        limits: { fileSize: 10 * 1024 * 1024 },
        useTempFiles: true,
        tempFileDir: '/tmp/'
    })
);

router.post('/', async (req, res, next) => {

    console.log('Upload router POST method!');
    if(!req.files ||!req.files.file){
        req.statusCode(400).json({ message: 'No files were uploaded!'});
    }

    const uploadedFile = req.files.file;

    // Print file information
    console.log('File Name: ' + uploadedFile.name);
    console.log('File Size: ' + uploadedFile.size);
    console.log('File Temp Path: ' + uploadedFile.tempFilePath);

    res.send(`File uploaded successfully! <br>
        File Name: ${uploadedFile.name} <br>
        File Size: ${uploadedFile.size} <br>
        File Temp Path: ${uploadedFile.tempFilePath}`);
});

module.exports = router;