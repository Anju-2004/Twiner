var express = require('express');
var router = express.Router();

const multer = require('multer');      // middleware
const uploader = multer({ dest: 'uploads' });

const db = require('../models');
const { checkLogin, createuser } = require('../service/userService');
const { hashPass } = require('../service/bcryptService');
const users = require('../models/users');
const User = require('../models').users;

db.sequelize.sync();


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { message: 'Please login to continue' });
});
router.get('/home', function (req, res, next) {
  res.render('home', { username: req.session.username, pic: req.session.pic, discription : req.session.profiletext });
});
// router.get('/usertest', async function (req, res, next) {
//   var user = await db.users.findAll({});
//   res.send(user);
// })

router.get('/account', async function (req, res, next) {
  res.render('account', { message: 'Please create your account' });
});

router.post('/getinfo', async function (req, res, next) {
  let userData = req.body;

  // Check if passwords match
  if (userData.password !== userData.confirm_password) {
    return res.send("Passwords do not match");
  }

  try {
    let passwordhash = await hashPass(userData.password);

    // Check if username already exists
    let existingUser = await db.users.findOne({ where: { username: userData.username } });
    if (existingUser) {
      return res.send("Username already exists");
    }

    // Create the user in the database
    let newUser = await db.users.create({
      username: userData.username,
      passwordhash: passwordhash, // Make sure to use passwordhash here
      email: userData.email,
      gender: userData.gender,
      phoneNo: userData.phone,
      profiletext: userData.text
    });
    res.redirect('/'); // Redirect to home page after successful signup
  } catch (error) {
    console.error("Error creating user:", error);
    res.send("Error creating user");
  }
});

router.post('/checkAvailable', async function (req, res, next) {
  let username = req.body.username;
  let user = await db.users.findOne({ where: { username: username } });
  if (user !== null) {
    res.json({ available: false, username: username });
  }
  else {
    res.json({ available: true, username: username })
  }
});


router.post('/home', async function (req, res, next) {
  // read username and password, check valid credential or not 
  let username = req.body.username;
  let password = req.body.password;

  let user = await checkLogin(username, password);
  if (user) {
    // if successful , render home.ejs with the data
    req.session.username = user.username;
    req.session.logintime = new Date();
    req.session.userid = user.userid;     // from session get userid
    req.session.pic = user.pic;
    req.session.discription = user.profiletext;
    req.session.userid = user.userid;

    res.render('home', { username: req.session.username, pic: user.pic, discription : user.profiletext });
  } else {
    // else failed login render index.ejs with proper message
    res.send("Login Failed");
  }

  // print the tweets of the user 
});

// use multer here
router.post('/createAccount', uploader.single('pic'), async function (req, res, next) {
  let userrec = { ...req.body };
  userrec.pic = req.file.path;
  console.log('userrec', userrec);
  let usercreated = await createuser(userrec);

  // console.log(usercreated);
  res.redirect('/');

  // res.json({status : 'account created', ...usercreated});
});

router.get('/createAccount', async function (req, res, next) {
  res.render('createAccount');
});


router.get('/updateprofile', (req, res) => {
  res.render('update_profile', { user: req.user });
});


//middleware.js

// function isLoggedIn(req, res, next) {
//   req.session.redirectURL = req.originalUrl;
//   if (!req.session.username) {
//       return res.redirect("/signin");
//   }
//   next();
// }

// module.exports = { isLoggedIn };

router.post('/update', async (req, res) =>{
  console.log("hii");
      const { newpassword, confirm_password, email, phoneNo, profiletext } = req.body;
      // Check if the new password matches the confirmation
      // if (newpassword !== confirm_password) {
      //     return res.status(400).send('Passwords do not match');
      // }
      const username = req.session.username;

        const updatedFields = {};
        if (newpassword) updatedFields.passwordhash = await hashPass(newpassword);
        if (email) updatedFields.email = email;
        if (phoneNo) updatedFields.phoneNo = phoneNo;
        if (profiletext) updatedFields.profiletext = profiletext;

        
        // Update the user's profile in the database
        let user = await User.update(updatedFields, { where: { username: username } });
        console.log(user);

        // Redirect the user to the home page after successful update
        res.redirect("/home");

  //   try {
  //     await User.update({ pic: req.file.path.substring(7) }, { where: { username: username } });
  //     req.flash("success", "Successfully Uploaded profile picture");
  //     res.redirect("/dashboard");
  // } catch {
  //     req.flash("error", "Error uploading profile picture");
  //     res.redirect("/dashboard");

  // }

})

module.exports = router;

