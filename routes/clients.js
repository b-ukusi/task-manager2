const express = require('express');
const router = express.Router();
const db = require('../db')
// declared controler// 
const client_controller = require("../controllers/clientcontroller")
var clients=[];
var user=[];
var userid;
var projects=[];
var tasks=[];
/// client ROUTES ///

/* client */
router.get('/', (req, res, next) => {
console.log('init Client:', req.query.user);
console.log("REquest user id account:",req.query.user);
console.log("global user id account a :",userid);

if (req.query.user !='undefined'){
 userid=req.query.user;
}
    /* dispalying dev tasks and progress */
    
    db.query("call getclient_projects (?)",[userid],  (err, rows)=> {
       
       if (rows[0].length==0) {
           console.log("no tasks found");
         }
       else {
        console.log("got tasks",rows[0]);
        tasks=rows[0];

        //loop through all taks and group per project . \
        console.log("db  length within projects",tasks.length);     
       
          
        
                      
            for(const p of tasks) {
                if (!projects[p.projectid]) {
                  console.log(" New project. add its empty tasks")
                  console.log(projects[p.projectid])
                  projects[p.projectid]={
                    project_name : p.projectname,
                    project_description:p.description,
                    project_id:p.projectid,
                    tasks : [{
                      task_id : p.taskid,
                      task_name : p.task_name,
                      start_date : p.startdate,
                      end_date:p.enddate,
                      is_done : p.isdone

                    }]
                  };

                }else{
                  console.log("Found existing project. so inlude teh task therein");
                  projects[p.projectid].tasks.push({
                    task_id : p.taskid,
                    task_name : p.task_name,
                    start_date : p.startdate,
                    end_date:p.enddate,
                    is_done : p.isdone

                  });
                }
            };

          }
         
      
projects = projects.filter(element => element);
console.log("show  tasks within projects",projects); 


  res.render('client.jade',{ projects:projects, tasks:tasks, user:user, clients:clients}); 
   });      

 
});



 /* client notes page just to see the syles   */
 router.get('/notes', (req, res, next) => {
    res.render('clientnotes.jade');
    
 });

   /* display account details of loged in user   */
 router.get('/account', (req, res, next) => {
   
   console.log("REquest user id account:",req.query.user);
   console.log("global user id account b :",userid);
  if (req.query.user>0){
   userid=req.query.user;
   
  }
  // its getting in here.
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

   

 /* projetcs in relation ot clinet */ 
router.get('/projects', (req, res, next) => {
  
  res.render('clientprojects.jade');
  
});
module.exports = router;