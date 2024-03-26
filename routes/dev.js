const express = require('express');
const router = express.Router();
const db = require('../db')

 // --fetch proj
// gt projects 
var developers=[];


/*dashboad page  */
router.get('/', (req, res, next) => {
    res.render('developer.jade');
     
   });
  

/* dev project page   */

router.get('/projects', (req, res, next) => {
    res.render('developerprojects.jade');
     
   });

/* dev notes page  */
  router.get('/notes', (req, res, next) => {
    res.render('developernotes.jade');
     
   });
 
/*dev account page  */
  router.get('/account', async (req, res, next) => {


    console.log("REquest user id account:",req.query.user);
  var developers=[];
    db.query("call get_userdetails(?)",[req.query.user],  (err, rows)=> {
    
      if (rows[0].length==0) {
          console.log("no users found");
        }
      else {
          developers=rows[0];
        }
        console.log("render user ",developers);

    res.render('daccountdetails.jade',{developers:developers});
});
   });
  


module.exports = router;