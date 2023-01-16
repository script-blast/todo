const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
mongoose.set('strictQuery', true);
const urltoconnect='mongodb+srv://' + process.env.USERID + '-' + process.env.PASSWORD +':mongo-app@cluster0.gr79ch6.mongodb.net/dairy';
mongoose.connect(urltoconnect);

const todoschema = mongoose.Schema({
    todo:String
});

const todoItem=mongoose.model("todoItem",todoschema);

const app=express();
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine","ejs");

app.use(express.static("Public"));


//adding new item
app.post("/",function(req,res){
    let nitem=req.body.todo;
    let ntodo=new todoItem({
        todo:nitem
    })
    ntodo.save();
    res.redirect("/");
})


//handling basic loading request
app.get("/", function(req,res){
    todoItem.find(function(err,items){
        res.render("list", {todolist: items});
    })
});

//deleting an items
app.post("/delete",function(req,res){
    let ditem=req.body.checkbox;
    todoItem.deleteOne({id:ditem},function(err){
        if(err){
            console.log(err);
        }
    })
    res.redirect("/");
})
//creating an about page
let port=process.env.PORT;
if(port==NULL || port ==""){
    port=3000;
}
app.get("/about",function(req,res){
    res.render("about");
})

app.listen(port,function(){
    console.log("Server Started at port 3000");
});
