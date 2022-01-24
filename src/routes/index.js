var express = require('express');
var router = express.Router();

// const fs = require('fs');
// const Product = require('../models/products')


/* GET home page. */
// router.get('/', function(req, res, next) {
//   const data = fs.readFileSync('./data/shoes.json', 'utf8');
//   // parse JSON string to JSON object
//   const databases = JSON.parse(data);
//   const docs = databases.shoes
//   console.log( docs)
//   res.render('index',{docs: docs} );
// });

// router.post('/', function(req, res, next) {
//   const dataWrite = fs.writeFileSync('./data/carts.json', 'utf8')
// })
router.get('/', async function(req, res, next) {
  // const data = {}
  //  data.data_1 = await Product.find({$or:[{"added": false},{}]})
  //  data.data_2 = await Product.find({"added": true})
   
   //res.json(data)
   res.render('index')
});

module.exports = router;

