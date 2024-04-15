const express = require('express');
const router = express.Router();
const db = require('../db')
const PDFDocument = require('pdfkit');
const fs = require('fs');
const app = express();


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
  
 
  /*develo[er routs and db query */
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
  });


   /* clients routes and db queries */
  router.get('/clients', (req, res, next) => {
    
    res.render('aclient.jade',{ clients:clients} );

    /*
    db.query("call get_usertypes('client')",  (err, rows)=> {
    
      if (rows[0].length==0) {
          console.log("no clients found");
        }
      else {
          console.log("got clients",rows[0]);
          clients=rows[0];
        }
  
    res.render('aclient.jade',{ clients:clients} );
     
   }); */
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
        tasks=rows[0];
      }
       console.log("render tasks",tasks); 

    res.render('atasks.jade',{tasks:tasks,projects:projects});  
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
  
  if (err){
    console.log(err);
    res.render('dbupSmessage.jade', { message: 'Failed to create client.' });
  }
  else{
    console.log(rows);
    res.render('dbupFmessage.jade', { message: 'Client created successfully!' });
  }
  
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

  /* create tasks page  
  router.get('/creattask', (req, res, next) => {
    console.log("Ad project",req.query);

  const {client,developer,ProjectName,description,startdate,enddate}=req.query;
db.query("call save_project(?,?,?,?,?,?)",[client,developer,ProjectName,description,startdate,enddate],  (err, rows)=> {
  console.log(err);
  console.log(rows);
  });*/


/** report gen route  */
router.get('/report', (req, res, next) => {
  // return res.render('')
  console.log("Generate Project REport for project name ", req.query.projects);
 //CALL ('billing system')

  db.query("call get_project_report(?)",[req.query.projects],  (err, rows)=> {
  
   db.query("call get_project_tasks(?)",[req.query.projects],  (err, ptasks)=> {
   // console.log(err);
    console.log(rows[0].length);
    generatePDF( req.query.projects.toUpperCase(),  rows[0],ptasks[0]);
    });


    });

 });


 function generatePDF(pname,data,ptasks) {
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
 


router.get
module.exports = router;