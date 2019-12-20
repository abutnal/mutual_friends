var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var db = require('./database');
var session = require('express-session');

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
router.use(bodyParser.json())

// ...rest of the initial code omitted for simplicity.
const { check, validationResult } = require('express-validator');

// Public directory access
router.use(express.static(__dirname + '../public'));


// register the session with it's secret ID
router.use(session({secret: 'uitisawesome'}));




// GET Login page_______________________________________________________________________________________
router.get('/', function(req, res, next) {

  if(req.session.user_id){
    res.redirect('/admin');
  }
  else{
  res.render('login', { 
  	title: 'Login page',
    form_title: 'Enter username and password'
  });
  }


});


// GET Register page_______________________________________________________________________________________
router.get('/register', function(req, res, next) {
  if(req.session.user_id){
    res.redirect('/admin');
  }
  else{
  res.render('register', { 
    title: 'Register page'
  });
  }
});


// GET Admin page_______________________________________________________________________________________
router.get('/admin', function(req, res, next) {


 var  ADMIN_USER = "SELECT * FROM user_tbl WHERE user_id='"+ req.session.user_id +"'";
  
   db.query(ADMIN_USER, function(err, result){
 if(err) throw err;

  if(result.length>0){

    res.render('admin', { 
    title: 'Admin page',
    admin_name: result[0]['name'],
    admin_id: result[0]['user_id']
  });
  }
  else{
    res.redirect('/');
  }
 

});
 
});




// Display All users records_____________________________________________________________________________ 
const SELECT_ALL_QUERY = "SELECT * FROM user_tbl";
function showData(){
  router.post('/', (req, res)=>{ 
   db.query(SELECT_ALL_QUERY, function(err, result){
     if(err){
      return res.send(err);
    }
    else{
     const customers = result;
     return res.json(customers);
   }
 });

 });
}

showData();






// User Create_____________________________________________________________________________ 
router.post('/create_or_update_User', [
  check('name', 'Required').not().isEmpty(),
  check('phone', 'Required').not().isEmpty(),
  check('email', 'Email is required').not().isEmpty(),
  check('password', 'Password is required').not().isEmpty(),
  check('email', 'Invalid Email id').isEmail(),
  check('password', 'Invalid password').isLength({min:5}),
  check('phone', 'Invalid phone').isLength({min:10, max:10})
  ], (req,res)=>{
   const errors = validationResult(req);
   if(!errors.isEmpty()){
    return res.json(errors);
  }
  else{
   var SQL_QUERY = '';
   var message = '';
   if(req.body.user_id!=''){
    SQL_QUERY = "UPDATE user_tbl SET `name`='"+req.body.name+"', `phone`='"+req.body.phone+"', `email`='"+req.body.email+"', `password`='"+req.body.password+"' WHERE `user_id`='"+req.body.user_id+"'";
    message = 'updated';
  }
  else{
    SQL_QUERY = "INSERT INTO user_tbl (name, phone, email, password) VALUES ('"+req.body.name+"', '"+req.body.phone+"', '"+req.body.email+"', '"+req.body.password+"')";
    message = 'added';
  }    
  db.query(SQL_QUERY, function (err, result) {
    if (err) throw err;
    return res.json({
      status: 'success', msg:message
    });

  }); 
}
});




// User Add Frineds / Mutual friends____________________________________________________________________
router.post('/user_action',(req,res)=>{
 const user_id = req.body.user_id;
 const friend_id = req.body.friend_id;
 const btn_type = req.body.btn_type;
 var SQL_QUERY = '';

 if(btn_type=='add_friend'){
    SQL_QUERY = "INSERT INTO friends_tbl (user_id, friend_id) VALUES ('"+user_id+"', '"+friend_id+"')";
 }


 if(btn_type=='mutual_friend'){
    // SQL_QUERY = "SELECT * FROM friends_tbl WHERE user_id IN ('"+user_id+"', '"+friend_id+"') GROUP BY friend_id";
    SQL_QUERY = "SELECT u.name, f.friend_id, f.user_id, count(id) as cnt FROM friends_tbl AS f LEFT JOIN user_tbl AS u ON f.friend_id = u.user_id WHERE f.user_id IN ('"+user_id+"', '"+friend_id+"') GROUP BY f.friend_id HAVING cnt > 1";
 }



db.query(SQL_QUERY, function(err, result){
 if(err) throw err;

 if(btn_type=='add_friend'){
  return res.json('success');
 }

 if(btn_type=='mutual_friend'){
  return res.json(result);
 }


});


});




// Login_____________________________________________________________________________ 
router.post('/login', [
  check('email', 'Required').not().isEmpty(),
  check('password', 'Required').not().isEmpty(),
  ], (req,res)=>{
   const errors = validationResult(req);
   if(!errors.isEmpty()){
    return res.json(errors);
  }
  else{
  
   const email = req.body.email;
 const password = req.body.password;

 const  SELECT_WHERE = "SELECT * FROM user_tbl WHERE email='"+ email +"' AND password='"+ password +"'";
  


db.query(SELECT_WHERE, function(err, result){
 if(err) throw err;


  if(result.length>0){
    req.session.user_id = result[0]['user_id'];
    return res.json('7k88dfldnfdnfsnf83497');
  }
  else{
    return res.json('failed');
  }
 

});


}
});


// Logout_____________________________________________________________________________ 
router.get('/logout',function(req,res){
  req.session.destroy(function(err) {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/admin');
    }
  });

});






module.exports = router;
