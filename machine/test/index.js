const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const EmployeeModel = require('./models/usermodel')
const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/machineTest")

app.get("/login", async(req, res)=>{
    const user = await EmployeeModel.create({
        name: "second",
        email: "second mail",
        password: "jaba jaba password"
    });
    user.save()
    res.status(201).send("User created successfully");
})
 
app.get("/getAll",async(req, res)=>{
    const allUserDetails = await EmployeeModel.find()
    res.status(201).send({allUsers:allUserDetails})
})

app.post("/editUser/:id", async(req, res)=>{
    const { id } = req.params
    await EmployeeModel.updateOne({_id:id}, {name:"second edited"})
    res.status(201)?.send("User edited successfully")
})

app.post("/deleteUser/:id", async(req, res)=>{
    const { id } = req.params
    await EmployeeModel.deleteOne({_id:id})
    res.status(201)?.send("User deleted successfully")
})

app.listen(8000, (err)=>{    
    console.log("server is rumming")
})