const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://todo_user:todo123@cluster0.3eixwtj.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

const trySchema = new mongoose.Schema({
    item: String,
    priority: String
});
const Item = mongoose.model('task', trySchema);

app.get('/', async function (req, res) {
    try {
        const foundItems = await Item.find({});
        res.render("list", {
            dayej: foundItems,
            editing: null,
            errorMessage: null,
            successMessage: null
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error retrieving items from database.");
    }
});

app.post("/", async function (req, res) {
    const itemName = req.body.item.trim();
    const priority = req.body.priority || "Low";

    if (!itemName) {
        const foundItems = await Item.find({});
        return res.render("list", {
            dayej: foundItems,
            editing: null,
            errorMessage: "Task cannot be empty!",
            successMessage: null
        });
    }

    const newItem = new Item({ item: itemName, priority: priority });

    try {
        await newItem.save();
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.status(500).send("Error saving item to database.");
    }
});

app.post("/delete", async function (req, res) {
    const itemId = req.body.checked;
    try {
        await Item.findByIdAndDelete(itemId);
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.status(500).send("Error deleting item from database.");
    }
});

app.get("/edit/:id", async function (req, res) {
    const taskId = req.params.id;
    try {
        const task = await Item.findById(taskId);
        const allTasks = await Item.find({});
        res.render("list", {
            dayej: allTasks,
            editing: task,
            errorMessage: null,
            successMessage: null
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error loading edit form.");
    }
});

app.post("/edit/:id", async function (req, res) {
    const taskId = req.params.id;
    const newItem = req.body.item.trim();
    const newPriority = req.body.priority;

    if (!newItem) {
        const allTasks = await Item.find({});
        const editing = await Item.findById(taskId);
        return res.render("list", {
            dayej: allTasks,
            editing,
            errorMessage: "Task cannot be empty!",
            successMessage: null
        });
    }

    try {
        await Item.findByIdAndUpdate(taskId, { item: newItem, priority: newPriority });
        const allTasks = await Item.find({});
        res.render("list", {
            dayej: allTasks,
            editing: null,
            errorMessage: null,
            successMessage: "Task updated successfully!"
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error updating task.");
    }
});



app.listen(1627, function () {
    console.log('Server is running on port 1627');
});
