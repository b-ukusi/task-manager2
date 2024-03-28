const express = require('express');
const router = express.Router();
const db = require('../db')

 // --fetch proj
// gt projects 
var developers=[];
var user=[];
var userid;


/*dashboad page  */
router.get('/', (req, res, next) => {

     console.log("developer dash ",req);

     console.log("REquest user id account:",req.query.user);
     console.log("global user id account a :",userid);

     if (req.query.user !='undefined'){
      userid=req.query.user;
     }
     var developers=[];
       db.query("call get_userdetails(?)",[req.query.user],  (err, rows)=> {
       
         if (rows[0].length==0) {
             console.log("no users found");
           }
         else {
             developers=rows[0];
             user=developers;
             userid=user[0].Userid;
           }
           console.log("render user ",developers);
   
       res.render('developer.jade',{user:developers, developers:developers});
   });
   
     
   });
  

/* dev project page   */

router.get('/projects', (req, res, next) => {

    res.render('developerprojects.jade',{user:user,developers:developers});
     
   });

/* dev notes page  */
  router.get('/notes', (req, res, next) => {
    res.render('developernotes.jade',{user:user,developers:developers});
     
   });
 
/*dev account page  */
  router.get('/account', async (req, res, next) => {


    console.log("REquest user id account:",req.query.user);
    console.log("global user id account b :",userid);
   if (req.query.user !='undefined'){
    userid=req.query.user;
   }
   console.log("global user id account bc :",userid);

    var developers=[];
    db.query("call get_userdetails(?)",[userid],  (err, rows)=> {
    
      if (rows[0].length==0) {
          console.log("no users found");
        }
      else {
          developers=rows[0];
          user=developers[0];
        }
        console.log("render user ",developers);

    res.render('daccountdetails.jade',{user:user,developers:developers});
});
   });
  


module.exports = router;