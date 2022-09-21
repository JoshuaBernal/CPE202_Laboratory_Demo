var express = require('express');

var router = express.Router();

const jwt = require('jsonwebtoken');

var dbConn = require('../../config/db');

router.post('/signup', (req, res, next) => {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    try {
        sqlQuery = `INSERT INTO account_credentials{username, email, password} VALUES{"${username}","${email}","${password}"}`
        dbConn.query (sqlQuery, function(error, results){
            console.log(results);
        });
        
    } catch (error) {
        console.log(error);
        return next(error);
    }

    res.status(200).json(
        {success:true}
    )
    
});

module.exports = router;
