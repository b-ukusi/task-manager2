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
    db.query("call get_userdetails(developer)",  (err, rows)=> {
    
      if (rows[0].length==0) {
          console.log("no users found");
        }
      else {
          console.log("got users ",rows[0]);
          projects=rows[0];
        }
    res.render('daccountdetails.jade');
})
   })
  


module.exports = router;