var express = require('express');
var app = express();
var fs = require('fs');
var raws = [];

var bodyParser = require("body-parser");
const { json } = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));




function readData() {
    fs.readFile('dataSource.json', 'utf-8', (err, data) => {
        if (err) {
        }
        var json;
        if (data.length !== 0) {
            json = JSON.parse(data);
            return res.send(json);
        }
        else {
            json = []
            return res.send(json);
        }

    });

}

function writeData() {

    fs.writeFile('dataSource.json', JSON.stringify(json), 'utf-8', (err, result) => {
        if (err) {
        }
    })
    
    
}


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/ajax.html');
});
app.get('/list-data', (req, res) => {
    fs.readFile('dataSource.json', 'utf-8', (err, data) => {
        if (err) {
        }
        var json;
        if (data.length !== 0) {
            json = JSON.parse(data);
            return res.send(json);
        }
        else {
            json = []
            return res.send(json);
        }

    });

})
app.post('/edit-data', (req, res) => {

    fs.readFile('dataSource.json', 'utf-8', (err, data) => {
        if (err) {

        }

        var json;
        var id;
        if (data.length !== 0) {

            id = req.body.index;
            json = JSON.parse(data);
            return res.send(json[id]);

        } else {
            json = []
        }

    });
});
app.post('/update-data', (req, res) => {
    console.log('req.body', req.body)
    fs.readFile('dataSource.json', 'utf-8', (err, data) => {
        if (err) {
            console.log('errrrr', err)
        }
        var json;
        var id;
        if (data.length !== 0) {
            id = req.body.dataid;
            json = JSON.parse(data);
            json[id].firstName = req.body.firstName
            json[id].lastName = req.body.lastName
            json[id].mobile = req.body.mobile
            json[id].Email = req.body.email
            fs.writeFile('dataSource.json', JSON.stringify(json), 'utf-8', (err, result) => {
                if (err) {

                }
                res.end()
            })
        } else {
            json = []
        }

    });
});
app.post('/deleteData', (req, res) => {
    fs.readFile('dataSource.json', 'utf-8', function (err, data) {
        var json;
        if (data.length !== 0) {

            json = JSON.parse(data);
        } else {
            json = []
        }
        var removeData = json.splice(req.body.index, 1);
        removeData.push({ "firstName": req.body.firstName, "lastName": req.body.lastName, "mobile": req.body.mobile, "Email": req.body.email });
        fs.writeFile('dataSource.json', JSON.stringify(json), 'utf-8', (err, result) => {
            if (err) {
            }
        })
        res.send('ok')
    });
});
app.post('/submit-student-data', function (req, res) {
    fs.readFile('dataSource.json', 'utf-8', function (err, data) {
        var json;
        if (data.length !== 0) {
            json = JSON.parse(data);
        } else {
            json = []
        }
        json.push({ "firstName": req.body.firstName, "lastName": req.body.lastName, "mobile": req.body.mobile, "Email": req.body.email });
        fs.writeFile('dataSource.json', JSON.stringify(json), 'utf-8', (err, result) => {
            if (err) {
            }
        })
        res.send('ok')
    });
});


app.post('/submit-student-json', function (req, res) {
    var obj = {
        'firstName': req.body.firstName,
        'lastName': req.body.lastName,
        'mobilE': req.body.mobile,
        'emaiL': req.body.email
    }
    res.json({
        obj: obj
    });
});

var server = app.listen(5000, function () {
    console.log('Node server is running..');
});