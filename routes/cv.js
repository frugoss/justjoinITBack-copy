const router = require('express').Router();
const Cv = require('../models/upload.model');
const formidable = require('formidable');
const {join} = require ('path')



router.post('/upload', (req, res) => {
    const uploadsFolder = join(__dirname, '/../uploads');
    const form = formidable({multiples: true, uploadDir: uploadsFolder, keepExtensions: true})
    form.parse(req, (err, fields, files) => {
        const filePath = files.file.path.split('/')
        const fileName = filePath[filePath.length-1]
        const newUpload = new Cv({
            ...fields, file: fileName
        });

        if (err) {
            return;
        }


        newUpload.save().then(() => res.json('CV sent')).catch(err => res.status(400).json('Error: ' + err));

    })
})

router.get('/get', async(req, res) => {
    try {
        const cv = await Cv.find()
        res.json(cv);
    }catch(err){
        res.json({message:err})
    }
});


module.exports = router;
