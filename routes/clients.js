const express = require('express');
const router = express.Router();
const db = require('../db')
// declared controler// 
const client_controller = require("../controllers/clientcontroller")
var clients=[];
var user=[];
var userid;
/// client ROUTES ///

/* client */
router.get('/', (req, res, next) => {
console.log('init Client:', req.query.user);
    userid=req.query.user;
    res.render('client.jade',{user:user});
});

   /* client notes page just to see the syles   */
 router.get('/notes', (req, res, next) => {
    res.render('clientnotes.jade');
    
 });

   /* display account details of loged in user   */
 router.get('/account', (req, res, next) => {
   
   console.log("REquest user id account:",req.query.user);
   console.log("global user id account b :",userid);
  if (req.query.user !='undefined'){
   userid=req.query.user;
  }
  console.log("global user id account bc :",userid);

   var clients=[];
   db.query("call get_userdetails(?)",[userid],  (err, rows)=> {
   
     if (rows[0].length==0) {
         console.log("no users found");
       }
     else {
         clients=rows[0];
         user=clients[0];
       }
       console.log("render user ",clients);


   res.render('caccountdetails.jade',{user:user,clients:clients});
}); 
});

   

 
module.exports = router;