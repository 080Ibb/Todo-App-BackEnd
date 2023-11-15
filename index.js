const express = require("express")
const mongoose = require("mongoose");
const ejs = require("ejs")
const app = express()
app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))
const PORT = 1112

const MONGO_URI = 
"mongodb+srv://salmanibrahima02:080Salman@cluster0.q6uwwrz.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI).then(()=> {
    console.log("Mongo DB Connected Successfully");
})
.catch(()=> {
    console.log("There was an error connecting mongo db");
});

const taskSchema = mongoose.Schema({
    task: String,
    description: String,
    location: String,
    priority: String,
    createdAt: Date,
});

const taskModel = mongoose.model("taskCollection", taskSchema);

app.listen(PORT, ()=>{
    console.log("APP is started on " + PORT)
});

let taskArray = [];
app.get("/", (req, res) => {
    res.render("index");
  });
  
  app.get("/display", (req, res) => {
    console.log("I am being run")
    res.render("display", { task: taskArray });
  });


app.post("/submit-task", (req, res)=>{
    taskArray.push(req.body)
    res.render("display", {task: taskArray});
})

 
 
  
  
  app.get("/edit", (req, res) => {
    const index = req.index;
    const taskToEdit = taskArray[index];
    res.render("edit", { task: taskToEdit, index });
  });
  
  
  app.post("/edit", (req, res) => {
    const index = req.index;
    taskArray[index] = {
      task: req.body.task,
      description: req.body.description,
      priority: req.body.priority,
    };
    res.redirect("/display");
  });
  
  app.post("/submit-task", (req, res) => {
    console.log(req.body);
    taskArray.push(req.body);
    res.render("display", { task: taskArray });
  });
  
  app.post("/delete", (req, res) => {
    const index = req.body.index;
    taskArray.splice(index, 1);
    res.render("display", { task: taskArray });
  });