//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const port = 3000;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.set('view engine','ejs');

const ejsObject2Send={
  listTitle:"",
  taskArray:[],
};
const ejsWorkObject2Send={
  listTitle:"Work List",
  taskArray:[],
};


app.get("/", function(req,res){

  day=date.getDate();

  ejsObject2Send.listTitle=day;
  // ejsObject2Send.newListTask=lastTask;

  // res.render('list',{kindOfDay:day});
  res.render('list',{ejsObject2Receive:ejsObject2Send});

});

app.get("/work",function(req,res){
  // ejsWorkObject2Send.listTitle="Work List";
  res.render('list',{ejsObject2Receive:ejsWorkObject2Send});
});

app.post("/", function(req,res){
  // console.log(req.body);
  if (req.body.list==="Work") {
    // ejsWorkObject2Send.listTitle="Work List";
    ejsWorkObject2Send.taskArray.push(req.body.task);
    res.redirect("/work");
  }else{
  ejsObject2Send.taskArray.push(req.body.task);
  res.redirect("/");
  }
});

app.get("/about",function(req,res){
  res.render('about',);
});


app.listen(process.env.PORT || port, function(){
  console.log("Server is running on port "+ port);
});
