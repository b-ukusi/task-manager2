const express = require('express');
const router = express.Router();
const db = require('../db')
// var  popup=require('popups')


router.get('/login', (req, res, next) => {

  const {username,password} =  req.query;
  console.log(` found username ${username} and pass ${password}`);
  // check if user is in db ans password is correct 
  // if user is in db render the dashboard 
  //if user is not found render an error page 
  // res.send('hello world')


db.query("call get_users(?,?)",[username,password],  (err, rows)=> {
  
  if (rows[0].length==0) {
      console.log("unknowj user");
      return res.json( { message: "Unknown user" });

    }
  else {
      console.log("yaay");

    }
      var user =rows[0];

      res.json(user)
  });


});


router.get('/', (req, res, next) => {

     //console.log(" login form content",req)
    const {username,password} =  req.query;
    console.log(` found username ${username} and pass ${password}`);
    // check if user is in db ans password is correct 
    // if user is in db render the dashboard 
    //if user is not found render an error page 
    // res.send('hello world')


  db.query("call get_users(?,?)",[username,password],  async (err, rows)=> {
    
    if (rows[0].length==0) {
        console.log("unknowj user");
        return res.render('index.jade', { error:true, message: "\n  Unknown Credentials" });

      }
    else {
        console.log("yaay");

      }
        var user =rows[0];
        const userType = user[0].userType;
        console.log("user",user);
        console.log("userType",userType);

        // Render different pages based on user's type
        switch (userType.trim())  {
            case "developer":
              console.log("developer auth. user=",user);
                 // coz we now have the user/developer, we cna now fetch teh developer projects and add then to the render
    let tasks=[];           
     await    db.query("call getdev_tasks (?)",[user[0].Userid],  (err, rows)=> {
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


  res.render('developer.jade',{ projects:projects, tasks:tasks, user:user[0], developers:user[0]}); 
   }
  );

   console.log("fetching dev projects sync");
   break; // so we exit the switch
              
              
              
                  case "admin":
                console.log("Redirect to admin",userType.trim());
                return res.redirect('admin');
          
              case "client":
                  console.log("laod client ",user)
                  return res.render('client.jade', {projects:[], user:rows[0][0], uid: user.Userid, uname: rows[0][0].FirstName });
              default:
                console.log("error page on  type ",userType)
                  return res.render('error.jade', { uname: rows[0][0].FirstName });
        }
  });

  });


  module.exports = router;