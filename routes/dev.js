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
           console.log("get dev tasks user ",userid);
           var tasks=[];


/* dispalying dev tasks and progress */
           db.query("call getdev_tasks (?)",[userid],  (err, rows)=> {
            let projects=[];     
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

                        // projects[p.projectid].tasks.push({
                        //   // task_id : p.taskid,
                        //   task_name : p.description,
                        //   start_date : p.startdate,
                        //   end_date:p.enddate,
                        //   is_done : p.isdone

                        // });

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
  /*console.log('init Client:', req.query.user);
    userid=req.query.user;
    /* dispalying dev tasks and progress */
   /* db.query("call getdev_projects (?)",[userid],  (err, rows)=> {
      let projects=[];     
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

                  // projects[p.projectid].tasks.push({
                  //   // task_id : p.taskid,
                  //   task_name : p.description,
                  //   start_date : p.startdate,
                  //   end_date:p.enddate,
                  //   is_done : p.isdone

                  // });

                /*}else{
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
*/
    res.render('developerprojects.jade',{ user:user,developers:developers});
     
  
});

/* dev notes page  */
  router.get('/notes', (req, res, next) => {
    var notes=[];
    db.query("call get_notes()",  (err, rows)=> {
    
      if (rows[0].length==0) {
          console.log("no notes found");
        }
      else {
          console.log("got notes",rows[0]);
          tasks=rows[0];
        }
         console.log("render notes",notes); 
    res.render('developernotes.jade',{notes:notes, user:user,developers:developers});
     
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
  
/* get devs projects and dipaly  /
// Example: Assume userId holds the logged-in user's identifier
db.query("CALL get_dev_projectsdev(?)", [userid], (err, rows) => {

  if (rows[0].length == 0) {
      console.log("No projects found");
  } else {
      console.log("Got projects", rows[0]);
      const projects = rows[0];
      // Continue with further processing as needed
  }
  res.render('developerprojects.jade',{developers:developers, projects:projects});
});  

*/
module.exports = router;