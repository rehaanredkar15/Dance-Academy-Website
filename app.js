const express = require("express");  //importing the package
const fs = require("fs");
const path = require('path');
const app = express();  //made a app containing express which is imported
const port = 80; 

const bodyparser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/RehanCart', { useNewUrlParser: true });
       

app.use('/static', express.static('static'));
app.use(express.urlencoded());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// A mongoose schema defines the structure of the document. also
// it provides the default values and validatiors
/* schema tells  the database in which feild which value will be presented for example sections
in library*/

//now we will create a schema
const ContactSchema = new  mongoose.Schema({
  name: String,
  phone: String,
  address : String,
  style: String
}); 

//now what is model of a schema ?
/* It is a model is a wrapper of schema , so model can be called the collections 
  a model provides the interface to the database for creating querying 
  updating and deleting records and the structure of this interface is provided 
  by the schema , model requires pascalcode that is 1st letter capital
   basically it is the collection*/

const Contact = mongoose.model('Contact', ContactSchema);

app.get("/index", (req, res) => {
    
  //  const con = "";
    const params = "";
    res.status(200).render('home.pug', params);
});

app.get("/contact", (req, res) => {
    
  //  const con = "";
    const params = {};
    res.status(200).render('contact.pug', params);
});

app.post("/contact", (req, res) => {
    
  //  const con = "";
  var myData = new Contact(req.body);
  myData.save().then(() => {
    res.send("this item has been saved to the database ")
  }).catch(() => {
     
    res.status(400).render("item not svaed");
  });

    // res.status(200).render('contact.pug');
})


app.post("/index", (req, res) => {

    console.log(`The application started successfully on port ${port}`);
});

app.listen(port, () => {
    
    console.log(`The application started sucessfully on port ${port}`); 
    
});

