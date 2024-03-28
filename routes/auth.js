const express = require('express');
const router = express.Router();
const db = require('../db')
// var  popup=require('popups')

router.get('/', (req, res, next) => {

     //console.log(" login form content",req)
    const {username,password} =  req.query;
    console.log(` found username ${username} and pass ${password}`);
    // check if user is in db ans password is correct 
    // if user is in db render the dashboard 
    //if user is not found render an error page 
    // res.send('hello world')


  db.query("call get_users(?,?)",[username,password],  (err, rows)=> {
    
    if (rows[0].length==0) {
        console.log("unknowj user");
        return res.render('error.jade', { message: "Unknown user" });

      }
    else {
        console.log("yaay");

      }
        var user =rows[0];
        const userType = user[0].userType;
        console.log("user",user);
        console.log("userType",userType);

        // Render different pages based on user's type
        switch (userType.trim()) {
            case "developer":
              console.log("developer auth. user=",user);
                return res.render('developer.jade', { user: rows[0][0],uname: rows[0][0].FirstName });
            case "admin":
              console.log("Redirect to admin");
              return res.redirect('admin');
        
            case "client":
                console.log("laod client ")
                return res.render('client.jade', { uname: rows[0][0].FirstName });
            default:
              console.log("error page on  type ",userType)
                return res.render('error.jade', { uname: rows[0][0].FirstName });
      }
});

});

module.exports = router;