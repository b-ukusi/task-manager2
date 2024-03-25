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
  router.get('/projects', async (req, res, next) => {
    var developers=[];
    var projects=[];
    var clients=[];

    console.log("Loaded projects page");


    await db.query("call get_projects()",  (err, rows)=> {
    
      if (rows[0].length==0) {
          console.log("no projects found");
        }
      else {
          console.log("got projects",rows[0]);
          projects=rows[0];
        }
   db.query("call get_usertypes('developer')",  (err, rows)=> {
    
          if (rows[0].length==0) {
              console.log("no developers found");
            }
          else {
              console.log("got developers projects ",rows[0]);
              developers=rows[0];
            }

  db.query("call get_usertypes('client')",  (err, rows)=> {

          if (rows[0].length==0) {
              console.log("no client found");
            }
          else {
              console.log("got client projects ",rows[0]);
              clients=rows[0];
            }

            console.log("render client projects ",clients );

            res.render('aprojects.jade',{projects:projects, developers:developers, clients:clients});
          });
            
            

          });

     
   });
   
  }); 
  
 
  /*develo[er routs and db query */
  router.get('/developers', (req, res, next) => {
    db.query("call get_usertypes('developer')",  (err, rows)=> {
    
      if (rows[0].length==0) {
          console.log("no developers found");
        }
      else {
          console.log("got developers ",rows[0]);
          developers=rows[0];
        } 
    res.render('adevelopers.jade', {developers:developers});
     
   });
  });


   /* clients routes and db queries */
  router.get('/clients', (req, res, next) => {
    db.query("call get_usertypes('client')",  (err, rows)=> {
    
      if (rows[0].length==0) {
          console.log("no clients found");
        }
      else {
          console.log("got clients",rows[0]);
          clients=rows[0];
        }
  
    res.render('aclient.jade',{ clients:clients} );
     
   });
  });



/* admin tasks page */
router.get('/tasks', (req,res,next)=>{
 var tasks=[];
  db.query("call get_tasks()",  (err, rows)=> {
    
    if (rows[0].length==0) {
        console.log("no tasks found");
      }
    else {
        console.log("got tasks",rows[0]);
        projects=rows[0];
      }
       console.log("render tasks",tasks); 

    res.render('atasks.jade',{tasks:tasks});  
});
});


  /* create projects projects page  */
  router.get('/createproject', (req, res, next) => {
    console.log("Ad project",req.query);

  const {client,developer,ProjectName,description,startdate,enddate}=req.query;
db.query("call save_project(?,?,?,?,?,?)",[client,developer,ProjectName,description,startdate,enddate],  (err, rows)=> {
  console.log(err);
  console.log(rows);
  });


});


  /*create client client page  */
  router.get('/createclient', (req, res, next) => {
    console.log("Ad client",req.query);

  const {FirstName,LastName,EmailUser,Pass}=req.query;
db.query("call save_user(?,?,?,?,?)",['client',FirstName,LastName,EmailUser,Pass],  (err, rows)=> {
  console.log(err);
  console.log(rows);
  });


  });
  /* create developer developer pages */
  router.get('/createdev', (req, res, next) => {
    console.log("Ad client",req.query);

  const {FirstName,LastName,EmailUser,Pass}=req.query;
db.query("call save_user(?,?,?,?,?)",['developer',FirstName,LastName,EmailUser,Pass],  (err, rows)=> {
  console.log(err);
  console.log(rows);
  });


  });


  /*
      ProjectName: '',
  clientname: '',
  developer: '24092',
  'start_date ': '',
  description: '' */





/*nav bar routes to see of theyle work  */
router.get
module.exports = router;