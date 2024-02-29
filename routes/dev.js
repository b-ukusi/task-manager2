const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('developer.jade');
     
   });
  
    /* dev notes page just to see the syles   */
  router.get('/projects', (req, res, next) => {
    res.render('developerprojects.jade');
     
   });
   /* dev notes page just to see the syles   */
  router.get('/notes', (req, res, next) => {
    res.render('developernotes.jade');
     
   });
   /*dev notes page just to see the syles   */
   router.get('/account', (req, res, next) => {
    res.render('daccountdetails.jade');
   })
  


module.exports = router;