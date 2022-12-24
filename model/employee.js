const Mongoose = require("mongoose");
const employeeSchema = Mongoose.Schema({
    name: String,
    location:String,
    position:String,
    salary: Number,
  });
  const EmployeeModel = Mongoose.model("employees",employeeSchema);
  module.exports = {EmployeeModel}
  
