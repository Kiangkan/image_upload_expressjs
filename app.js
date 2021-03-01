const express = require('express');
const app = express();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        if (file.mimetype !== 'image/jpeg') {
            cb("your file sould be an jpeg image")
        } else {
            cb(null, file.originalname)
        }
    }
});

const upload = multer({ storage: storage });

app.use(express.static('./uploads'))

app.get('/', function(req, res) {
    const template = fs.readFileSync(path.join(__dirname, 'template', 'index.html')).toString();
    res.send(template)
});

app.post('/uploads', upload.single('files'), function(req, res) {
    console.log(req.file)
    res.json(req.file)
})

module.exports = app;