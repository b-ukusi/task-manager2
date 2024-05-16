const express = require('express');
const router = express.Router();
const db = require('../db')

 // --fetch proj
// gt projects 
var developers=[];
var user=[];
var userid;
var notes=[];
// var projects =[];



/*dashboad page  */
router.get('/', (req, res, next) => {

     console.log("developer dash ");

     console.log("REquest user id account:",req.query.user);
     console.log("global user id account a :",userid);

     if (req.query.user !='undefined'){
      userid=req.query.user;
     }

     var developers=[];
     db.query("call get_userdetails(?)",[userid],  (err, rows)=> {
       
         if (rows[0].length==0) {
             console.log("no users found");
           }
         else {
             developers=rows[0];
             user=developers;
             userid=user[0].Userid;
           }
           console.log("get dev tasks user ",userid);
           
           var tasks=[];


/* dispalying dev tasks and progress */
           db.query("call getdev_tasks (?)",[userid],  (err, rows)=> {
            projects=[];     
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


        res.render('developer.jade',{ projects:projects, tasks:tasks, user:developers, developers:developers}); 
         });      
   
       
   });
   
     
   });
  

/* dev project page   */
 router.get('/projects', (req, res, next) => {
     console.log('load projects', userid);
     console.log("show  tasks within projects",projects); 
     db.query("CALL get_dev_projectsdev(?)", [userid], (err, rows) => {

      if (rows[0].length == 0) {
           console.log("No projects found");
       } else {
          console.log("Got projects", rows[0]);
           const projects = rows[0];
           // Continue with further processing as needed
       }
       res.render('developerprojects.jade',{projects:projects,user:user, developers:developers });
     });  
    
     res.render('developerprojects.jade',{ projects: projects, user:user,developers:developers});
     
  
 });

/* dev notes page  */
  router.get('/notes', (req, res, next) => {
 
    db.query("call get_notes()",  (err, rows)=> {
    
      if (rows[0].length==0) {
          console.log("no notes found");
        }
      else {
          console.log("got notes",rows[0]);
          notes=rows[0];
        }
         console.log("render notes",notes); 

      db.query("call get_tasks()",  (err, rows)=> {
    
          if (rows[0].length==0) {
              console.log("no tasks found");
            }
          else {
              // console.log("got tasks",rows[0]);
              tasks=rows[0];
            }
             console.log("render tasks",tasks); 


    res.render('developernotes.jade',{notes:notes, user:user,developers:developers});
          });  
   });
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
  
/* get devs projects and dipaly*/
 //Example: Assume userId holds the logged-in user's identifier
 

 /* create items pnotes projects page  */

 router.get('/createnotes', (req, res, next) => {
  console.log("Ad new task",req.query);

const {task,notename,description}=req.query;
db.query("call save_notes(?,?,?)",[task,notename,description],  (err, rows)=> {
if (err){
  console.log(err);
  res.render('fail.jade', { message: 'Failed to create project.' });
}
else{
  console.log(rows);
  res.render('succnotes.jade', { message: 'Project created successfully!' });
}
});
});

router.get('/createnotes', (req, res, next) => {
res.render('succnotes.jade');
});

module.exports = router;