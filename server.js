var express = require('express');
var cors = require('cors');
const multer = require('multer')
require('dotenv').config()
const upload = multer().single('upfile')
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});





app.post('/api/fileanalyse/', function(req, res) {
 
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.log("Instance error");
    } else if (err) {
      // An unknown error occurred when uploading.
      console.log(err);
    }

    // Everything went fine.
    res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    })
  })
})

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Your app is listening on port ' + port)
});
