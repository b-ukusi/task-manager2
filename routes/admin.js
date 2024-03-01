const express = require('express');
const router = express.Router();
const db = require('../db')

/*controllers*/




/* admin, project manager  */
router.get('/', async (req, res, next) => {

  console.log("Loaded admin page");

  // --fetch proj
// gt projects 
  var projects=[];
  var clients=[];
  var developers=[];

 await db.query("call get_projects()",  (err, rows)=> {
    
    if (rows[0].length==0) {
        console.log("no projects found");
      }
    else {
        console.log("got projects",rows[0]);
        projects=rows[0];
      }

      // get edes

  db.query("call get_usertypes('developer')",  (err, rows)=> {
    
        if (rows[0].length==0) {
            console.log("no developers found");
          }
        else {
            console.log("got developers ",rows[0]);
            developers=rows[0];
          }
    
      // get clients 

  db.query("call get_usertypes('client')",  (err, rows)=> {
    
            if (rows[0].length==0) {
                console.log("no clients found");
              }
            else {
                console.log("got clients",rows[0]);
                clients=rows[0];
              }
        
      
            
          console.log("Go load admin page");
          res.render('admin.jade',{developers:developers, clients:clients, projects:projects});
    
          
        });
    

    
      
      });

     });

    });
    
/* admin, project manager  */
  router.get('/projects', (req, res, next) => {
    res.render('aprojects.jade');
     
   });
   
  router.get('/developers', (req, res, next) => {
    res.render('adevelopers.jade');
     
   });
  router.get('/clients', (req, res, next) => {
    res.render('aclient.jade');
     
   });
   

module.exports = router;