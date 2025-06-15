const express = require('express');
const bodyParser = require('body-parser');

var app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));

var items = [];
app.get('/', function(req, res) {
    res.render("list", { ejes: items });
});

app.post("/", function(req, res) {
    var item = req.body.item;
    items.push(item);
    res.redirect('/');
});


app.listen(1627, function () {
    console.log('Server is running on port 1627');
});