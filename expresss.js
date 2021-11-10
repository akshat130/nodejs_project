var express = require('express');
var app = express();
app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/bootstrap.html');
});

app.get('/c', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.get('/d', function (req, res) {
    res.sendFile(__dirname + '/json.html');
});


app.get('/a', function (req, res) {
    res.sendFile(__dirname + '/a_bootstrap.html');
}); 

app.get('/z', function (req, res) {
    res.sendFile(__dirname + '/nodekakmal.html');
}); 

app.get('/b', function (req, res) {
    res.sendFile(__dirname + '/newForm.html');
});

app.get('/e', function (req, res) {
    res.sendFile(__dirname + '/ajax.html');
});

app.get('/f', function (req, res) {
    res.sendFile(__dirname + '/akshat.html');
});

app.post('/submit-student-data', function (req, res) {
    console.log(req.body)
    res.send('POST Request');
});


app.post('/submit-data', function (req, res) {
    res.send('POST Request');
});

app.put('/update-data', function (req, res) {
    res.send('PUT Request');
});

app.delete('/delete-data', function (req, res) {
    res.send('DELETE Request');
});
{/* <div class="row"></div> */}
var server = app.listen(5000, function () {
    console.log('Node server is running..');
});