const express = require('express')
const app = express();

var mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testdb'

})

connection.connect()


  // creating a new table 
var sql = "CREATE TABLE m (name VARCHAR(255), address VARCHAR(255))";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });


  //inserting new data
  var sql = "INSERT INTO customers (name, address) VALUES ('Co Inc', 'Higy 37')";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });



  //fetching data from data base
app.get('/', (req, res) => {
    connection.query('select * from customers', function (err, rows, fields)
    {
        if (err) throw err
        console.log('The data is', rows)
        res.send(rows[0]);
    })
});

  //updating data base
var sql = "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Highway 37'";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
  });

  //deleting a data base
  var sql = "DELETE from customers WHERE address = 'Higy 37'";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
  });


app.listen(6000, () => {
  console.log('Example app listening on port 6000!')
});