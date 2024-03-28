const express = require('express');
const router = express.Router();
const clientRouter = require('./clients');
const adminRouter = require ('./admin');
const devRouter = require('./dev');

var user=[];

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index.jade');
  });


router.get('/', (req, res, next) => {

    // console.log(" login form content",res)
    const {user_name,password} =  req.query;
    console.log(` found username ${user_name} and pass ${password}`);
    // check if user is in db ans password is correct 
    // if user is in db render the dashboard 
    //if user is not found render an error page 
    // res.send('hello world')


  db.query("call get_user(?,?)",[user_name,password],  (err, rows)=> {
      console.log(rows[0]);
      if (rows[0].length==0) {
        //   popup.alert({
        //     content: "Sorry. unknown credentials"
        //   });
        console.log("unknowj user");
      }else{
        // popup.alert({
        //     content: "Yaaay"
        //   });
console.log("yaay");
         user=rows[0];
        if (rows[0][0]["UserType"]=="developer") {
            res.render('developer.jade',{user:user,"uname": rows[0][0]["FirstName"]});
        }else{
            res.render('client.jade',{"uname": rows[0][0]["FirstName"]});
        }
     

      }
    /*
    console.log("get user message" , rows[0][0]["message"]);
    console.log("get user rsp" , rows[0][0]["rsp"]);
    var notes=["note 1", "note 2"];
    if (rows[0][0]["rsp"]==1){
        console.log("Show new username ",{"uname": rows[0][0]["full_names"],"notes":notes});
        res.render('client.jade',{"uname": rows[0][0]["full_names"],"notes":notes});
    }else{
       res.send(rows[0][0]["message"]);
    }

    */
});



  //  
})

module.exports = router;
