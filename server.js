var express = require('express');
var mysql = require('mysql');

var app = express();
 
app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})

app.get('/process_get', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置response编码为utf-8
   
   // 输出 JSON 格式
   var connection = mysql.createConnection({
      host     : 'rm-2zex57803gjoj26bzzo.mysql.rds.aliyuncs.com',
      user     : 'epac',
      password : 'epac123!@#',
      database : 'epac' 
   });
   connection.connect();
   connection.query('select  * from ybx_expert where id = '+req.query.user_id, function (error, results, fields) {
      if (error) throw error;
      res.status(200)
      res.end(JSON.stringify(results));
   });
})
 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})