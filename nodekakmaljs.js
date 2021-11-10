var express = require('express');
var app = express();
var fs = require('fs');
//var data = [data1];
// var data1 = [];

var bodyParser = require("body-parser");
const { json } = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/ajax.html');
});

app.post('/submit-student-data', function (req, res) {
    // var data = [];
    //var data = [];
   console.log(req.body.lastName);

    //     fs.writeFile("results.json", JSON.stringify(json))
    // })
  //  var data1 = [];
    var currentSearchResult = {"firstName":req.body.firstName, "lastName":req.body.lastName, "mobile":req.body.mobile};

   // console.log("hi" + currentSearchResult);
    fs.readFile('dataSource.json', function (err, data) {
        console.log('error', err);
        console.log('data', data.length);
        var json;
        if(data.length !== 0){

            json = JSON.parse(data);
            console.log('not empty');
        } else {
            json = []
            console.log('empty')
        }
        // var json = JSON.parse(data)
       // json.push('search result: ' + currentSearchResult)

        json.push({"firstName":req.body.firstName, "lastName":req.body.lastName, "mobile":req.body.mobile,"Email":req.body.email});
        //fs.writeFile('dataSource.json',JSON.stringify(data1), 'utf-8', ()=>{
        fs.writeFile('dataSource.json', JSON.stringify(json), 'utf-8', () => {

        });



        var name = '<table border="1"><tr><th>First Name :</th><td>' + req.body.firstName + '</td></tr><tr><th>Last Name</th><td>' + req.body.lastName +
            '</td></tr><tr><th>First Mobile :</th><td>' + req.body.mobile + '</td></tr><tr><th>Email :</th><td>' + req.body.email + '</td></tr></table>';

        res.send(name + ' Submitted Successfully!');
    });
});


    app.post('/submit-student-json', function (req, res) {
        var obj = {
            'firstName': req.body.firstName,
            'lastName': req.body.lastName,
            'mobilE': req.body.mobile,
            'emaiL': req.body.email
        }
        /* var name = 'First Name :'+req.body.firstName + 'Last Name' + req.body.lastName +
        'First Mobile :'+ req.body.mobile + 'Email :'+ req.body.email;
        var data = 'dssds';
        res.send(JSON.parse(name + ' Submitted Successfully!',data)); */
        res.json({
            obj: obj
        });
        // res.send(json.obj);

    });

    var server = app.listen(5000, function () {
        console.log('Node server is running..');
    });