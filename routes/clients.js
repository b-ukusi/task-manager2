const express = require('express');
const router = express.Router();

// declared controler// 
const client_controller = require("../controllers/clientcontroller")

/// client ROUTES ///

/* client */
router.get('/', (req, res, next) => {
    res.render('client.jade');
});

   /* client notes page just to see the syles   */
 router.get('/notes', (req, res, next) => {
    res.render('clientnotes.jade');
    
 });
   /* client notes page just to see the syles   */
 router.get('/account', (req, res, next) => {
    res.render('caccountdetails.jade');
    
   });

module.exports = router;