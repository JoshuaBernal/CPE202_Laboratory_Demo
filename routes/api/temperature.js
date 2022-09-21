var express = require('express');

var router = express.Router();

var dbConn = require('../../config/db');

//INSERT
// @routes POST api/temperature/add
// @desc Insert Data to Database
// @access Pubic
router.post('/add',(req,res) =>{   

    // get the input from the user trough request (req)

    console.log(req.body);

    var temperature = req.body.temperature;

    var deviceId = req.body. deviceId;

    var date = req.body.date;


    // connect to mysql database and perform INSERT Query

    sqlQuery = `INSERT INTO temp_tb (temperature, device_Id,date) VALUES (${temperature},"${deviceId}","${date}")`

    dbConn.query(sqlQuery,  function( error, results, fields ){ 

         if (error) throw error;

        res.status(200).json(results);

    });

});
// SELECT or (VIEW)
// @routes GET api/temperature/view

// @desc View Data from the Database

// @access Pubic

router.get('/view', (req, res) => {

    dbConn.query('SELECT * FROM temp_tb', function (
    
        error,
    
        results,
    
        fields
    
      ) {
    
        if (error) throw error;
    
            res.status(200).json(results);  
    
      });
    
    });
// UPDATE
router.put('/update/:id', (req, res)=>{
    console.log(req.body);

    var date = req.body.date;
    var temperature = req.body.temperature;
    var deviceId = req.body.device_id;
    var readingId = req.params.id;

    sqlQuery = `UPDATE temp_tb SET date="${date}", temperature="${temperature}", device_id="${deviceId}" WHERE id=${readingId}`;

    dbConn.query(sqlQuery,  function( error, results, fields ){ 

         if (error) throw error;

         res.status(200).json({
            msg:'Data Successfully Updated',
            results:results,
           });

});
});
// DELETE
//@routes DELETE temperature/delete/:id
// @desc DELETE Data
// @access PRIVATE
router.delete('/delete/:id', (req,res)=>{
    //print body for checking
    console.log(req.params.id);
    var readingId = req.params.id;
    sqlQuery = `DELETE FROM temp_tb WHERE id=${readingId}`;
    dbConn.query(sqlQuery,  function( error, results, fields ){ 

        if (error) throw error;

       res.status(200).json({
        msg:'Data Successfully Deleted',
        results:results,
       });
    });
});
//SEARCH BY ID
router.get('/search/:id', (req, res)=>{
    console.log(req.params.id);
    var readingId = req.params.id;
    sqlQuery = `SELECT * FROM temp_tb WHERE id=${readingId}`;
    dbConn.query(sqlQuery, function(error, results, fields){
        if (error) throw error;
        res.status(200).json({
            msg:'Search Results:',
            results:results,
        });
    });
});
//SEARCH BY DEVICEID USING LIKE FUNCTION
router.get('/searchlike/:device_id', (req, res)=>{
    console.log(req.params.device_id);
    var deviceId = req.params.device_id;
    sqlQuery = `SELECT * FROM temp_tb WHERE device_id LIKE "%${deviceId}%"`;
    dbConn.query(sqlQuery, function(error, results, fields){
        if (error) throw error;
        res.status(200).json({
            msg:'Search Results:',
            results:results,
        });
    });
});
module.exports = router;