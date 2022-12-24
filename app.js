// Task1: initiate app and run server at 3000
const express = require("express");
const Bodyparser = require("body-parser");
const Mongoose = require("mongoose");
const app = new express();
const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
const { EmployeeModel } = require("./model/employee");
app.use(Bodyparser.json());
app.use(Bodyparser.urlencoded({ extended: false }));

// Task2: create mongoDB connection 
Mongoose.connect("mongodb+srv://Archana:Archana@cluster0.d5wvbdh.mongodb.net/Employeedb?retryWrites=true&w=majority",
{ useNewUrlParser: true });

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below

//TODO: get data from db  using api '/api/employeelist'
app.get("/api/employeelist", (req, res) => {
    EmployeeModel.find((err, data) => {
      if (err) {
        res.json({
          status: "error",
          error: err,
        });
      } else {
        res.json(data);
      }
    });
  });
  
//TODO: get single data from db  using api '/api/employeelist/:id'

 app.get('/api/employeelist/:id', async (req, res) => {
    try{
        const data = await EmployeeModel.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post("/api/employeelist", async (req, res) => {
    const data = req.body;
    const employee = new EmployeeModel(data);
    const result = await employee.save((err, data) => {
      if (err) {
        res.json({
          status: "error",
          error: err,
        });
      } else {
        res.json({
          status: "success",
          data: data,
        });
      }
    });
    console.log(data);
  });
  
//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete('/api/employeelist/:id', async(req, res)=>{
  try{
    const data = await EmployeeModel.findByIdAndRemove({
      _id: req.params.id})
      res.send(data);
  }
  catch (error) {
          res.status(400).json({ message: error.message })
      }
  });

//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put('/api/employeelist', async (req, res) => {
    try {
      const id = req.body._id;
      const data = req.body;
      const result = await EmployeeModel.findOneAndUpdate({"_id":id},data)
      res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});

app.listen(3000, () => {
  console.log("Server Started");
});



