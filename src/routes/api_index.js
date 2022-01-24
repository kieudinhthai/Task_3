var express = require('express');
var router = express.Router();
var multer = require('multer');
const fs = require('fs');
const path = require('path');
// const Product = require('../models/products')


/* GET home page. */
router.get('/', function (req, res, next) {
  const data = fs.readFileSync('./data/families.json', 'utf8');
  // parse JSON string to JSON object
  const databases = JSON.parse(data);
  res.json(databases);
});


router.get('/search', function (req, res, next) {
  const data = fs.readFileSync('./data/families.json', 'utf8');
  // parse JSON string to JSON object
  
  const databases = JSON.parse(data);
  for (let i = 0; i < databases.length; i++) {
    if (databases[i].birthday == req.query.q || databases[i].husband.birthday == req.query.q || databases[i].wife.birthday == req.query.q) {
      var result = databases[i]
     
        var resp  =[result]
      
     
      break
    }

  }
  
  for (let j = 0; j < databases.length; j++) {
   if (databases[j].generation >  result.generation && result.child == true  ) {
     resp.push(databases[j])
   }
  }
  res.json(resp)
});


router.get('/:id', function (req, res, next) {
  const data = fs.readFileSync('./data/families.json', 'utf8');
  // parse JSON string to JSON object
  const databases = JSON.parse(data);
  for (let i = 0; i < databases.length; i++) {
    if (databases[i]._id == req.params.id || databases[i].husband._id == req.params.id || databases[i].wife._id == req.params.id) {
      res.json(databases[i])
      break
    }

  }

});
// // router.post('/', function(req, res, next) {
// //   const dataWrite = fs.writeFileSync('./data/carts.json', 'utf8')
// // })
// router.get('/', async function(req, res, next) {
//   const data = {}
//    data.data_1 = await Product.find({})
//    data.data_2 = await Product.find({"added": true})

//   // res.json(data)
//   res.status(200).json(data)
// });

// upload file

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype === 'application/json'
      || file.mimetype === 'text/javascript'

    ) {
      cb(null, './data');
    } else {
      cb(new Error('not file', false))
    }
  },
  filename: (req, file, cb) => {
    fileName = `families` + path.extname(file.originalname);
    cb(null, fileName);
  }
});
const upload = multer({ storage: storage });

router.post('/upload', upload.single("myFile"), (req,res,next)=>{
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  res.redirect('/')
})


router.post('/:id',  function (req, res, next) {
  console.log(req.params.id)
  const data = fs.readFileSync('./data/families.json', 'utf8');
  // parse JSON string to JSON object
  const databases = JSON.parse(data);
  const data_update = req.body
  //let result =[]

 try {
  for (let i = 0; i < databases.length; i++) {
 
     if (req.params.id ==databases[i].husband._id ) {
      databases[i].husband.name = data_update.name
      databases[i].husband.birthday = data_update.birthday
      break
    }
     if (req.params.id == databases[i].wife._id ) {
       
      databases[i].wife.name = data_update.name
      databases[i].wife.birthday = data_update.birthday
      break
    }

    if (req.params.id == databases[i]._id ) {
      databases[i].name = data_update.name
      databases[i].birthday = data_update.birthday
      break
    }
  }
    fs.unlinkSync('./data/families.json')
    const write = fs.writeFileSync('./data/families.json', JSON.stringify(databases), "utf8");
    res.json({
      mess: 'success',
      write: write
    })
 
 } catch (error) {
   res.json(error)
 }

});

module.exports = router;
