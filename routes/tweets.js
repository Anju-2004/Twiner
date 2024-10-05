var express = require('express');
var router = express.Router();
const db = require("../models");
const multer = require('multer');      // middleware
const uploader = multer({ dest: 'uploads' });
// const db2 = require("../models/auto/init-models");
// const {users} = require("../models/auto/init-models");



db.sequelize.sync();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('all tweets');
});

router.get('/alltweets', async function(req, res, next) {
  let alltweets = await  db.tweets.findAll({});
  res.json(alltweets);
});

router.get('/:userid', async function(req, res, next) {
    let userid = req.params.serid;
    let alltweets = await db.tweet.findAll({
      where: {
        userid : userid 
      },
      include : 'user'
    })
      await db.employee.destroy({
      where : {empid : clientid}
  });
  res.json(alltweets);
});


router.post('/', uploader.single('media'), async function(req, res, next) {
    console.log('hii');
    let tweetrec = {...req.body};
    tweetrec.media = req.file.path;
    console.log(tweetrec);
    tweetrec.userid = req.session.userid;
    let tweet = await db.tweets.create(tweetrec);
    // res.send({message : 'Tweet saved '});
    // res.json({tweet});         
     // same as res.json({tweet : tweet}); 
    res.redirect('/home');  
  });
module.exports = router;


