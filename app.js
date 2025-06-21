const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// MongoDB connection
mongoose.connect('mongodb+srv://todo_user:todo123@cluster0.3eixwtj.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Mongoose schema and model
const trySchema = new mongoose.Schema({
    item: String,
    priority: String
});
const Item = mongoose.model('task', trySchema);

// GET home
app.get('/', async (req, res) => {
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
        res.status(500).send("Error retrieving items.");
    }
});

// POST new task
app.post("/", async (req, res) => {
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
        res.status(500).send("Error saving item.");
    }
});

// DELETE task
app.delete("/delete/:id", async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.status(500).send("Error deleting item.");
    }
});

// GET edit form
app.get("/edit/:id", async (req, res) => {
    try {
        const task = await Item.findById(req.params.id);
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

// PUT update task
app.put("/edit/:id", async (req, res) => {
    const newItem = req.body.item.trim();
    const newPriority = req.body.priority;

    if (!newItem) {
        const allTasks = await Item.find({});
        const editing = await Item.findById(req.params.id);
        return res.render("list", {
            dayej: allTasks,
            editing,
            errorMessage: "Task cannot be empty!",
            successMessage: null
        });
    }

    try {
        await Item.findByIdAndUpdate(req.params.id, {
            item: newItem,
            priority: newPriority
        });

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

// Start server
app.listen(1627, () => {
    console.log('Server is running on port 1627');
});
