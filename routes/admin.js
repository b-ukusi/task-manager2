const express = require('express');
const router = express.Router();
const db = require('../db')
const PDFDocument = require('pdfkit');
const fs = require('fs');
const app = express();

// const open = require('open');

// const { exec } = require('child_process');
// const path = require('path');


var projects=[];
var clients=[];
var developers=[];
var user;
/*controllers*/

/* admin, project manager  */
router.get('/', async (req, res, next) => {

  console.log("Loaded admin page");

  // --fetch proj
// gt projects 
 
  

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

    res.render('aprojects.jade',{projects:projects, developers:developers, clients:clients});

/*
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

          });
            
          res.render('aprojects.jade',{projects:projects, developers:developers, clients:clients});


          });

     
   });
   */
  }); 
  
 /*
  //develo[er routs and db query 
  router.get('/developers', (req, res, next) => {
    res.render('adevelopers.jade', {developers:developers});
    
    
    /*db.query("call get_usertypes('developer')",  (err, rows)=> {
    
      if (rows[0].length==0) {
          console.log("no developers found");
        }
      else {
          console.log("got developers ",rows[0]);
          developers=rows[0];
        } 
    res.render('adevelopers.jade', {developers:developers});
     
   }); */
 // });


   /* clients routes and db queries */
 

/* admin tasks page */
router.get('/tasks', (req,res,next)=>{
 var tasks=[];
  db.query("call get_tasks()",  (err, rows)=> {
    
    if (rows[0].length==0) {
        console.log("no tasks found");
      }
    else {
        console.log("got tasks",rows[0]);
        tasks=rows[0];
      }
       console.log("render tasks",tasks); 

    res.render('atasks.jade',{tasks:tasks,projects:projects});  
});
});


  /* create items projects projects page  */

  router.get('/createproject', (req, res, next) => {
    console.log("Ad new project",req.query);

  const {client,developer,ProjectName,description,startdate,enddate}=req.query;
db.query("call save_project(?,?,?,?,?,?)",[client,developer,ProjectName,description,startdate,enddate],  (err, rows)=> {
  if (err){
    console.log(err);
    res.render('fail.jade', { message: 'Failed to create project.' });
  }
  else{
    console.log(rows);
    res.render('dbupFmessage.jade', { message: 'Project created successfully!' });
  }
  });
});
 
router.get('/createproject', (req, res, next) => {
  res.render('dbupFmessage.jade');
});


  /*create client client page  */
  router.get('/createclient', (req, res, next) => {
    console.log("Ad new client",req.query);

  const {FirstName,LastName,EmailUser,Pass}=req.query;
db.query("call save_user(?,?,?,?,?)",['client',FirstName,LastName,EmailUser,Pass],  (err, rows)=> {
  
  if (err){
    console.log(err);
    res.render('fail.jade', { message: 'Failed to create client.' });
  }
  else{
    console.log(rows);
    res.render('dbupSmessage.jade', { message: 'Client created successfully!' });
    // each time we rrenser the message page, we want the custome message to show
    // and on ckick back, it will reload the url you specify as back commd
    // so you can use theis ov
  }
  
  });
 
  
});

router.get('/createclients', (req, res, next) => {
  res.render('dbupFmessage.jade');
});



  /* create developer developer pages */
  router.get('/createdev', (req, res, next) => {
    console.log("Ad new Developer",req.query);

  const {FirstName,LastName,EmailUser,Pass}=req.query;
db.query("call save_user(?,?,?,?,?)",['developer',FirstName,LastName,EmailUser,Pass],  (err, rows)=> {
 
  if (err){
    console.log(err);
    res.render('fail.jade', { message: 'Failed to create client.' });
  }
  else{
    console.log(rows);
    res.render('successdev.jade', { message: 'Client created successfully!' });
  }
  });

 });
 router.get('/createdev', (req, res, next) => {
  res.render('dbupFmessage.jade');
});



/*create tasks page*/  
  router.get('/creattask', (req, res, next) => {
    console.log("Add task",req.query);

   const {taskid,projectid,description,startdate,enddate}=req.query;
db.query("call save_task(?,?,?,?,?)",[taskid,projectid,description,startdate,enddate],  (err, rows)=> {
  
  if (err){
   // console.log(err);
   res.render('fail.jade', { message: 'Failed to create client.' });
   }
  else{
   console.log(rows);
    res.render('dbupSmessage.jade', { message: 'Client created successfully!' });
  }
  });
});
router.get('/createtasks', (req, res, next) => {
  res.render('dbupFmessage.jade');
});

/** report gen route  */

router.get('/report', (req, res, next) => {
  // return res.render('')
  console.log("Generate Project REport for project name ", req.query.projects);
 //CALL ('billing system')

  db.query("call get_project_report(?)",[req.query.projects],  (err, rows)=> {
  
   db.query("call get_project_tasks(?)",[req.query.projects],  (err, ptasks)=> {
   // console.log(err);
    console.log(rows[0].length);
    generatePDF(res, req.query.projects.toUpperCase(),  rows[0],ptasks[0]);
    });


    });

 });



 // create pdf from db info  

 function generatePDF(res,pname,data,ptasks) {
  
// exec(` start ${path.resolve(filePath)}`, (error, stdout, stderr) => {
//     if (error) {
//         console.error(`Error opening PDF file: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.error(`Error opening PDF file: ${stderr}`);
//         return;
//     }
//     console.log('PDF file opened successfully');
// });
  // Create a new PDF document
  const doc = new PDFDocument();
   


  // Add content to the PDF
  doc.fontSize(20).text( pname, { align: 'center' }); // our first element is the project name
  doc.moveDown();

  doc.fontSize(12).text("\n");
  doc.moveDown();


  // Loop through the data and add it to the PDF
  data.forEach(row => {
    console.log("Add new row",row);
    doc.fontSize(15).text(row.item_name);
    doc.fontSize(12).text(row.item_value);
    doc.fontSize(12).text("\n");
   // doc.fontSize(12).text(`${row.item_name}`, { continued: true }).text(`Field 2: ${row.item_value}`).moveDown();
  });
 doc.moveDown();
 doc.fontSize(18).text( "Tasks", { align: 'center' }); // our first element is the project name
 doc.moveDown();
 var percdone=0;
 ptasks.forEach(tsk => {
  percdone+=tsk.isdone=="Yes" ? 1 : 0;

  doc.fontSize(15).text(tsk.description + " Completed? " + tsk.isdone);
  doc.fontSize(12).text("\n");
 // doc.fontSize(12).text(`${row.item_name}`, { continued: true }).text(`Field 2: ${row.item_value}`).moveDown();
});

doc.moveDown();
doc.fontSize(18).text(`% Completed : ${(percdone/ptasks.length)*100} %`);


  doc.fontSize(8).text("Prepared By : me");
    doc.moveDown();

  // Finalize the PDF
  console.log("Save to disk");
  const fileName = 'xreport.pdf';
  const filePath = __dirname + '/' + fileName;
  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);
  doc.end();

  console.log('PDF report generated successfully.');


  res.download(filePath, `${pname}.pdf`, (err) => {
    if (err) {
      // Handle error
      console.error('Error downloading file:', err);
      // res.status(500).send('Internal Server Error');
    } else {
      // Delete the file after download if needed
      // fs.unlinkSync(pdfPath);
      console.log("Delete server file>");
    }
  });
  // res.setHeader('Content-disposition', 'attachment; filename=xreport.pdf');
  // res.setHeader('Content-type', 'application/pdf');
  
  // // Write the PDF content to the response
  // res.send(filePath);


  // Serve the PDF for download
  app.get('/download', (req, res) => {
    res.download(filePath, fileName, err => {
      if (err) {
        console.error('Error sending PDF file:', err);
        return;
      }
      // Delete the PDF file after it's sent
      fs.unlinkSync(filePath);
      console.log('PDF file sent successfully.');
    });
  });


}

/*delet items  */

/*delet cliets  */
router.get('/clients', async (req, res, next) => {

  console.log("load Clients",req.query);
  //here? 
 if (req.query.action){

   if (req.query.action=="delete" || req.query.action=="update"){
     console.log("Change Client ID ", req.query.Userid);
     console.log("old Client len", clients.length);

     var queryexec="delete from users where userid=?";
     var params=[req.query.Userid];
     if (req.query.action=="update"){
       queryexec="UPDATE `users` SET `FirstName` = ?,`LastName` = ?,`Pass` = ?,`Email` = ? WHERE `Userid` = ?;";
       params=[ req.query.FirstName,req.query.LASTNAME,req.query.Pass,req.query.Email,req.query.Userid];
     }


      db.query(queryexec,params , (err, rows)=> {
       // its ok we dont have to wait for our condition comes after exec.
           console.log("deleted");
           db.query("call get_usertypes('client')", (err, rows) => {

          if (rows[0].length == 0) {
            console.log("no client found");
          }
          else {

            clients = rows[0];
          }

          console.log("New Clients len", clients.length);

          console.log("renderclients page afresh ");
          res.render('aclient.jade', { clients: clients });

        });

     console.log("Reload from db and update clients global var");
   
 });

}
}
else{
  console.log("Clients list",clients);
// laod mormal if no action specified
// it seem s the clints variable


db.query("call get_usertypes('client')", (err, rows) => {

  if (rows[0].length == 0) {
    console.log("no client found");
  }
  else {

    clients = rows[0];
  }

  console.log("New Clients len", clients.length);

  console.log("renderclients page afresh ");
  res.render('aclient.jade', { clients: clients });

});
  




 }

});





/*delet developer*/
router.get('/developers', async (req, res, next) => {

  console.log("Action Developers",req.query);
 
 
 if (req.query.action){
   if (req.query.action=="delete" || req.query.action=="update"){
     console.log("Change Developers ID ", req.query.Userid);
     console.log("old Developers len", developers.length);

     var queryexec="delete from users where userid=?";
     var params=[req.query.Userid];
     if (req.query.action=="update"){
       queryexec="UPDATE `users` SET `FirstName` = ?,`LastName` = ?,`Pass` = ?,`Email` = ? WHERE `Userid` = ?;";
       params=[ req.query.FirstName,req.query.LASTNAME,req.query.Pass,req.query.Email,req.query.Userid];
     }

      console.log("queryexec ",queryexec);
      console.log("params",params);
      db.query(queryexec,params , (err, rows)=> {
       // its ok we dont have to wait for our condition comes after exec.
           console.log("actioned",rows);
           console.log(err);
           db.query("call get_usertypes('developer')", (err, rows) => {

          if (rows[0].length == 0) {
            console.log("no develoepr found");
          }
          else {

            developers = rows[0];
          }

          console.log("New Developers len",developers.length);

          console.log("renderdeveloperss page afresh ");
          res.render('adevelopers.jade', { developers: developers });

          return;

        });

     console.log("Reload from db and update developers global var");
   
 });

}
}
else{
  console.log("Developers list",developers);
// laod mormal if no action specified
// it seem s the clints variable



 db.query("call get_usertypes('developer')", (err, rows) => {

  if (rows[0].length == 0) {
    console.log("no developer found");
  }
  else {

    clients = rows[0];
  }

  console.log("New Developers len", developers.length);

  console.log("renderdevelopers page afresh ");
  res.render('adevelopers.jade', { developers: developers });

});
  




 }

});




/*delet task */


router.get('/tasks', async (req, res, next) => {

  console.log("load Tasks",req.query);
 
 if (req.query.action){

   if (req.query.action=="delete" || req.query.action=="update"){
     console.log("Change Task ID ", req.query.taskid);
     console.log("old Tasks len", tasks.length);

     var queryexec="delete from tasks where taskid=?";
     var params=[req.query.taskid];
     if (req.query.action=="update"){
       queryexec="UPDATE `tasks` SET `description` = ?,`startdate` = ?,`enddate` = ?,`projectid` = ? WHERE `Taskid` = ?;";
       params=[ req.query.description,req.query.startdate,req.query.enddate,req.query.projectid,req.query.Userid];
     }


      db.query(queryexec,params , (err, rows)=> {
       // its ok we dont have to wait for our condition comes after exec.
           console.log(" deleted");
           db.query("call get_tasks", (err, rows) => {

          if (rows[0].length == 0) {
            console.log("no task found");
          }
          else {

            clients = rows[0];
          }

          console.log("New Tasks len", tasks.length);

          console.log("rendertasks page afresh ");
          res.render('atasks.jade', { tasks:tasks });

        });

     console.log("Reload from db and update tasks global var");
   
 });

}
}
else{
  console.log("Task list",tasks);
  // laod mormal if no action specified
  // it seem s the clints variable
  
  
  
   db.query("call get_tasks", (err, rows) => {
  
    if (rows[0].length == 0) {
      console.log("no tasks found");
    }
    else {
  
      clients = rows[0];
    }
  
    console.log("New tasks len", tasks.length);
  
    console.log("rendertasks page afresh ");
    res.render('atasks.jade', { tasks: tasks });
  
  });
    
  
  
  
  
   }
  
  });
  



/*delet projects */

router.get('/projects', async (req, res, next) => {

  console.log("load Projecst",req.query);
 
 if (req.query.action){

   if (req.query.action=="delete" || req.query.action=="update"){
     console.log("Change Project ID ", req.query.Userid);
     console.log("old Project len", clients.length);

     var queryexec="delete from users where userid=?";
     var params=[req.query.Userid];
     if (req.query.action=="update"){
       queryexec="UPDATE `users` SET `projectname` = ?,`description` = ?,`startdate` = ?,`enddate` = ? WHERE `Userid` = ?;";
       params=[ req.query.projectname,req.query.description,req.query.startdate,req.query.enddate,req.query.Userid];
     }


      db.query(queryexec,params , (err, rows)=> {
       // its ok we dont have to wait for our condition comes after exec.
           console.log("deleted");
           db.query("call get_projects", (err, rows) => {

          if (rows[0].length == 0) {
            console.log("no project found");
          }
          else {

            clients = rows[0];
          }

          console.log("New Project len", clients.length);

          console.log("renderproject page afresh ");
          res.render('aprojects.jade', { projects: projects });

        });

     console.log("Reload from db and update clients global var");
   
 });

}
}
else{
  console.log("Projects list",projects);
  // laod mormal if no action specified
  // it seem s the clints variable
  
  
  
   db.query("call get_projects", (err, rows) => {
  
    if (rows[0].length == 0) {
      console.log("no project found");
    }
    else {
  
      clients = rows[0];
    }
  
    console.log("New project len", developers.length);
  
    console.log("renderprojecst page afresh ");
    res.render('aprojecst.jade', { projects: projects });
  
  });
    
  
  
  
  
   }
  
  });
  

module.exports = router;